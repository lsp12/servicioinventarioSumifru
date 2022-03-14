import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRanchDto } from './dto/create-ranch.dto';
import { UpdateRanchDto } from './dto/update-ranch.dto';
import { Ranch } from './entities/ranch.entity';

@Injectable()
export class RanchService {
  constructor(
    @InjectRepository(Ranch)
    private ranchsRepository: Repository<Ranch>,
  ) {}
  async create(createRanchDto: CreateRanchDto) {
    const ranch = await this.ranchsRepository.create(createRanchDto);
    await this.ranchsRepository.save(ranch);
    return await this.ranchsRepository.findOne(ranch.idHaciendad, {
      relations: ['zona'],
    });
  }

  async findAll() {
    const ranch = await this.ranchsRepository.find({
      relations: ['zona'],
    });
    if (!ranch) return [];
    return ranch;
  }

  async findOne(id: number) {
    const ranch = await this.ranchsRepository.findOne(id);
    if (!ranch) throw new BadRequestException('No existe el ranch');
    return ranch;
  }

  async findByNombre(nombre: string) {
    const ranch = await this.ranchsRepository.find({ nombre });
    return ranch;
  }

  async findByZona(nombre: string) {
    const ranch = await this.ranchsRepository.find({
      relations: ['zona'],
      where: {
        zona: {
          nombre,
        },
      },
    });
    if (!ranch) throw new BadRequestException('No existe el ranch');
    return ranch;
  }

  /* async findByUser(id: number) {
    const ranch = await this.ranchsRepository.find({
      where: {
        assignments: {
          user: id,
        },
      },
      relations: ['assignments', 'assignments.user'],
    });
    return ranch;
  } */

  async update(id: number, updateRanchDto: UpdateRanchDto) {
    const ranch = await this.ranchsRepository.findOne(id);
    if (!ranch) throw new BadRequestException('No existe el ranch');
    await this.ranchsRepository.update(id, updateRanchDto);
    return 'Haciendad actualizado';
  }

  async remove(id: number) {
    const ranch = await this.ranchsRepository.findOne(id);
    if (!ranch) throw new BadRequestException('No existe el ranch');
    await this.ranchsRepository.remove(ranch);
    return 'Haciendad eliminado';
  }
}
