import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMandatedDto } from './dto/create-mandated.dto';
import { UpdateMandatedDto } from './dto/update-mandated.dto';
import { Mandated } from './entities/mandated.entity';

@Injectable()
export class MandatedService {
  constructor(
    @InjectRepository(Mandated)
    private mandatedRepository: Repository<Mandated>
  ) {}

  async create(createMandatedDto: CreateMandatedDto) {
    const existedMandated = await this.mandatedRepository.findOne({
      where: {
        name: createMandatedDto.name,
        lastName: createMandatedDto.lastName
      }
    });
    if (existedMandated) throw new BadRequestException('usuario ya existe');
    const mandated = await this.mandatedRepository.create(createMandatedDto);
    await this.mandatedRepository.save(mandated).catch((error) => {
      throw new BadRequestException(
        error.driverError.sqlMessage,
        error.driverError.sqlState
      );
    });
    return await this.mandatedRepository.findOne(mandated.id, {
      relations: ['ranch']
    });
  }

  async findAll() {
    return `This action returns all mandated`;
  }

  async findByRanch(id: number) {
    const mandated = await this.mandatedRepository
      .find({
        where: {
          ranch: {
            idHaciendad: id
          }
        },
        relations: ['ranch']
      })
      .catch((error) => {
        throw new BadRequestException(
          error.driverError.sqlMessage,
          error.driverError.sqlState
        );
      });
    return mandated;
  }

  findOne(id: number) {
    return `This action returns a #${id} mandated`;
  }

  async update(id: number, updateMandatedDto: UpdateMandatedDto) {
    await this.mandatedRepository
      .update(id, updateMandatedDto)
      .catch((error) => {
        throw new BadRequestException(
          error.driverError.sqlMessage,
          error.driverError.sqlState
        );
      });
    return 'Mandated actualizado';
  }

  async remove(id: number) {
    await this.mandatedRepository.delete(id).catch((error) => {
      throw new BadRequestException(
        error.driverError.sqlMessage,
        error.driverError.sqlState
      );
    });
    return 'Mandated eliminado';
  }
}
