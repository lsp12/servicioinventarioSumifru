import { Injectable } from '@nestjs/common';
import { CreateUnitMdDto } from './dto/create-unit-md.dto';
import { UpdateUnitMdDto } from './dto/update-unit-md.dto';

@Injectable()
export class UnitMdService {
  create(createUnitMdDto: CreateUnitMdDto) {
    return 'This action adds a new unitMd';
  }

  findAll() {
    return `This action returns all unitMd`;
  }

  findOne(id: number) {
    return `This action returns a #${id} unitMd`;
  }

  update(id: number, updateUnitMdDto: UpdateUnitMdDto) {
    return `This action updates a #${id} unitMd`;
  }

  remove(id: number) {
    return `This action removes a #${id} unitMd`;
  }
}
