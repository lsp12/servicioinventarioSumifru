import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateZonaDto } from './dto/create-zona.dto';
import { UpdateZonaDto } from './dto/update-zona.dto';
import { Zona } from './entities/zona.entity';

@Injectable()
export class ZonaService {
  constructor(
    @InjectRepository(Zona)
    private respository: Repository<Zona>,
  ) {}
  async create(createZonaDto: CreateZonaDto) {
    const exist = await this.respository.findOne({
      where: {
        nombre: createZonaDto.nombre,
      },
    });
    if (exist) throw new ConflictException('Ya existe la zona');
    const zona = this.respository.create(createZonaDto);
    return await this.respository.save(zona);
  }

  async findAll() {
    const zona = await this.respository.find({ relations: ['users'] });
    if (zona.length > 0) {
      return zona;
    } else {
      return [];
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} zona`;
  }

  async findByUser(id: number) {
    console.log(id);
    const ranch = await this.respository.findOne({
      where: {
        users: {
          idUsuario: id,
        },
      },
    });
    return ranch;
  }

  async update(id: number, updateZonaDto: UpdateZonaDto) {
    const exist = await this.respository.findOne(id);
    if (!exist) throw new BadRequestException('No existe la zona');
    const update = this.respository.update(id, updateZonaDto);
    return 'Zone actualizada';
  }

  async remove(id: number) {
    const exist = await this.respository.findOne(id);
    if (!exist) throw new BadRequestException('No existe la zona');
    await this.respository.delete(id);
    return 'Zona eliminada';
  }
}
