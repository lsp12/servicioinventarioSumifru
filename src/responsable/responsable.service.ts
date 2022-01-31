import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateResponsableDto } from './dto/create-responsable.dto';
import { UpdateResponsableDto } from './dto/update-responsable.dto';
import { Responsable } from './entities/responsable.entity';

@Injectable()
export class ResponsableService {
  constructor(
    @InjectRepository(Responsable)
    private inventoryRepository: Repository<Responsable>
  ) {}
  create(createResponsableDto: CreateResponsableDto) {
    return 'This action adds a new responsable';
  }

  async findAll() {
    const responsables = await this.inventoryRepository.find({
      relations: ['user', 'ranch', 'inventory']
    });
    return responsables;
  }

  findOne(id: number) {
    return `This action returns a #${id} responsable`;
  }

  update(id: number, updateResponsableDto: UpdateResponsableDto) {
    return `This action updates a #${id} responsable`;
  }

  remove(id: number) {
    return `This action removes a #${id} responsable`;
  }
}
