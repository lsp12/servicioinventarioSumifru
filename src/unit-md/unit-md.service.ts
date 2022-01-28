import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUnitMdDto } from './dto/create-unit-md.dto';
import { UpdateUnitMdDto } from './dto/update-unit-md.dto';
import { UnitMd } from './entities/unit-md.entity';

@Injectable()
export class UnitMdService {
  constructor(
    @InjectRepository(UnitMd)
    private unitMdsRepository: Repository<UnitMd>
  ) {}

  async create(createUnitMdDto: CreateUnitMdDto) {
    console.log(createUnitMdDto);
    const existe = await this.unitMdsRepository.findOne({
      tipoUnida: createUnitMdDto.tipoUnida
    });
    if (existe) throw new BadRequestException('Ya existe la unidad');
    const unitMd = await this.unitMdsRepository.create(createUnitMdDto);

    return await this.unitMdsRepository.save(unitMd);
  }

  async createMany(createUnitMdDto: CreateUnitMdDto[]) {
    await this.unitMdsRepository.insert(createUnitMdDto);
    return 'Unidades creadas';
  }

  async findAll() {
    const unitMds = await this.unitMdsRepository.find();
    if (!unitMds) return [];
    return unitMds;
  }

  async findOne(id: number) {
    const unitMd = await this.unitMdsRepository.findOne(id);
    if (!unitMd) throw new BadRequestException('No existe la unidad');
    return unitMd;
  }

  async findByNombre(tipoUnida: string) {
    const unitMd = await this.unitMdsRepository.find({ tipoUnida });
    if (!unitMd) return [];
    return unitMd;
  }

  async update(id: number, updateUnitMdDto: UpdateUnitMdDto) {
    const unitMd = await this.unitMdsRepository.findOne(id);
    if (!unitMd) throw new BadRequestException('No existe la unidad');
    await this.unitMdsRepository.update(id, updateUnitMdDto);
    return 'Unidad actualizada';
  }

  async remove(id: number) {
    const unitMd = await this.unitMdsRepository.findOne(id);
    if (!unitMd) throw new BadRequestException('No existe la unidad');
    await this.unitMdsRepository.remove(unitMd);
    return 'Unidad eliminada';
  }

  async removeMany(ids: number[]) {
    const unitMds = await this.unitMdsRepository.findByIds(ids);
    if (!unitMds) throw new BadRequestException('No existen las unidades');
    await this.unitMdsRepository.remove(unitMds);
    return 'Unidades eliminadas';
  }
}
