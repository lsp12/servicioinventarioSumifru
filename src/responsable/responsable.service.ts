import { BadRequestException, Injectable } from '@nestjs/common';
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
  async create(createResponsableDto: CreateResponsableDto) {
    const responsable = this.inventoryRepository.create(createResponsableDto);
    await this.inventoryRepository.save(responsable);
    return await this.inventoryRepository.findOne(
      {
        idResponsable: responsable.idResponsable
      },
      {
        relations: ['user', 'ranch', 'inventory']
      }
    );
  }

  async findAll() {
    const responsables = await this.inventoryRepository.find({
      relations: ['user', 'ranch', 'inventory']
    });
    return responsables;
  }

  async findOne(id: number) {
    const responsable = await this.inventoryRepository.find({
      where: {
        idResponsable: id
      },
      relations: ['user', 'ranch', 'inventory']
    });
    if (!responsable) throw new BadRequestException('No existe el responsable');
    return responsable;
  }

  async findByUser(id: number) {
    const responsables = await this.inventoryRepository.find({
      where: {
        user: {
          idUsuario: id
        }
      },
      relations: ['user', 'ranch', 'inventory']
    });
    if (responsables.length > 0) {
      return responsables;
    } else {
      return [];
    }
  }

  async update(id: number, updateResponsableDto: UpdateResponsableDto) {
    const exist = await this.inventoryRepository.findOne(id);
    if (!exist) throw new BadRequestException('No existe el responsable');
    await this.inventoryRepository.update(id, updateResponsableDto);
    return 'Responsable actualizado';
  }

  async remove(id: number) {
    const exist = await this.inventoryRepository.findOne(id);
    if (!exist) throw new BadRequestException('No existe el responsable');
    await this.inventoryRepository.delete(id);
    return 'Responsable eliminado';
  }
}
