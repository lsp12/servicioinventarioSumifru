import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private RolesRepository: Repository<Role>
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const role = await this.RolesRepository.create(createRoleDto);
    return await this.RolesRepository.save(role);
  }

  async findAll() {
    return await this.RolesRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    return await this.RolesRepository.update(id, updateRoleDto);
  }

  async remove(id: number) {
    return await this.RolesRepository.delete(id);
  }
}
