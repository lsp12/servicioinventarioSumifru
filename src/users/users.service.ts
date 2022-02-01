import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { bcryptCompare, bcryptPassword } from './bcrypt/bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  generateAuthToken(user: User) {
    const token = jwt.sign(
      { user: user.idUsuario.toString(), role: user.role, nombre: user.nombre },
      'inventario',
      { expiresIn: '1d' }
    );
    return token;
  }

  async create(createUserDto: CreateUserDto) {
    const exist = await this.usersRepository.findOne({
      nombre: createUserDto.nombre
    });
    if (exist) throw new BadRequestException('User already exists');
    createUserDto.contraseña = await bcryptPassword(createUserDto.contraseña);
    const user = await this.usersRepository.create(createUserDto);
    await this.usersRepository.save(user);
    return user;
  }

  async login(login: CreateUserDto) {
    const user = await this.usersRepository.findOne({ nombre: login.nombre });
    if (user) {
      const auth = bcryptCompare(login.contraseña, user.contraseña);
      const { contraseña, ...userWithoutPassword } = user;
      if (auth) {
        return {
          user: userWithoutPassword,
          token: this.generateAuthToken(user)
        };
      } else throw new BadRequestException('Wrong password');
    } else throw new BadRequestException('User not found');
  }

  async findAll() {
    const users = await this.usersRepository.find();
    return users;
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOne(id);
    return user;
  }

  async findByNombre(nombre: string) {
    return await this.usersRepository.find({ nombre });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOne(id);
    if (user) {
      updateUserDto.contraseña = await bcryptPassword(updateUserDto.contraseña);
      await this.usersRepository.update(id, updateUserDto);
      return 'User updated successfully';
    } else throw new BadRequestException('User not found');
  }

  async remove(id: number) {
    const user = await this.usersRepository.findOne(id);
    if (user) {
      await this.usersRepository.remove(user);
      return 'User removed successfully';
    } else throw new BadRequestException('User not found');
  }
}
