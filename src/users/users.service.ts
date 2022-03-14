import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { bcryptCompare, bcryptPassword } from './bcrypt/bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as jwt from 'jsonwebtoken';
import { Role } from 'src/role/entities/role.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  generateAuthToken(user: User) {
    const { role } = user;
    console.log('es un role', role instanceof Role);
    //verificar si rol es tipo Role
    if (role instanceof Role) {
      const token = jwt.sign(
        { user: user.idUsuario.toString(), role: role.rol },
        'inventario',
        { expiresIn: '1d' },
      );
      return token;
    }
  }

  async create(createUserDto: CreateUserDto) {
    const exist = await this.usersRepository.findOne({
      numCedula: createUserDto.numCedula,
    });
    if (exist) throw new BadRequestException('User already exists');
    createUserDto.contraseña = await bcryptPassword(createUserDto.contraseña);

    const user = await this.usersRepository.create(createUserDto);
    await this.usersRepository.save(user);
    return user;
  }

  async login(login: CreateUserDto) {
    const user = await this.usersRepository.findOne(
      {
        numCedula: login.numCedula,
      },
      {
        relations: ['role'],
      },
    );
    if (user) {
      const auth = bcryptCompare(login.contraseña, user.contraseña);
      const { contraseña, ...userWithoutPassword } = user;
      if (auth) {
        return {
          user: userWithoutPassword,
          token: this.generateAuthToken(user),
        };
      } else throw new BadRequestException('Wrong password');
    } else throw new BadRequestException('User not found');
  }

  async findAll() {
    const users = await this.usersRepository.find({
      relations: ['role'],
    });
    return users;
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOne(id, {
      relations: ['role'],
    });
    return user;
  }

  async findByUser(id: number) {
    const users = await this.usersRepository.find({
      where: {
        idUsuario: id,
      },
      relations: ['responsables', 'responsables.inventory'],
    });
    return users;
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
