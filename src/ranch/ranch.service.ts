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
    private ranchsRepository: Repository<Ranch>
  ) {}
  async create(createRanchDto: CreateRanchDto) {
    const ranch = await this.ranchsRepository.create(createRanchDto);
    return await this.ranchsRepository.save(ranch);
  }

  async findAll() {
    const ranch = await this.ranchsRepository.find();
    if (!ranch) return [];
    return ranch;
  }

  async findOne(id: number) {
    const ranch = await this.ranchsRepository.findOne(id);
    if (!ranch) return [];
    return ranch;
  }

  async findByNombre(nombre: string) {
    const ranch = await this.ranchsRepository.find({ nombre });
    if (!ranch) return [];
    return ranch;
  }

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
