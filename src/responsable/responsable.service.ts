import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HistoryService } from 'src/history/history.service';
import { ZonaService } from 'src/zona/zona.service';
import { Repository } from 'typeorm';
import { CreateResponsableDto } from './dto/create-responsable.dto';
import { UpdateResponsableDto } from './dto/update-responsable.dto';
import { Responsable } from './entities/responsable.entity';

@Injectable()
export class ResponsableService {
  constructor(
    @InjectRepository(Responsable)
    private responsableRepository: Repository<Responsable>,
    private readonly historyService: HistoryService,
    private readonly zonaService: ZonaService
  ) {}
  async create(createResponsableDto: CreateResponsableDto) {
    const responsable = this.responsableRepository.create(createResponsableDto);
    await this.responsableRepository.save(responsable);
    await this.historyService.create({
      inventario: responsable.inventory,
      ranch: responsable.ranch,
      user: responsable.user
    });
    return await this.responsableRepository.findOne(
      {
        idResponsable: responsable.idResponsable
      },
      {
        relations: ['user', 'ranch', 'ranch.zona', 'inventory']
      }
    );
  }

  async findAll() {
    const responsables = await this.responsableRepository.find({
      relations: [
        'user',
        'ranch',
        'ranch.zona',
        'inventory',
        'inventory.category'
      ]
    });
    return responsables;
  }

  async findOne(id: number) {
    const responsable = await this.responsableRepository.find({
      where: {
        idResponsable: id
      },
      relations: ['user', 'ranch', 'inventory']
    });
    if (!responsable) throw new BadRequestException('No existe el responsable');
    return responsable;
  }

  async findByUser(id: number) {
    const responsables = await this.responsableRepository.find({
      where: {
        user: {
          idUsuario: id
        },
        inventory: {
          mantenimieto: false
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

  async findCountZona() {
    const zonas = await this.zonaService.findAll();
    const find = zonas.map(async (zona) => {
      const mantenimietoTrue = await this.responsableRepository.count({
        where: {
          ranch: {
            zona: zona.idZona
          },
          inventory: {
            mantenimieto: true
          }
        },
        relations: ['ranch', 'ranch.zona', 'inventory']
      });
      const mantenimietoFalse = await this.responsableRepository.count({
        where: {
          ranch: {
            zona: zona.idZona
          },
          inventory: {
            mantenimieto: false
          }
        },
        relations: ['ranch', 'ranch.zona', 'inventory']
      });
      const inventarioTotal = await this.responsableRepository.count({
        where: {
          ranch: {
            zona: zona.idZona
          }
        },
        relations: ['ranch', 'ranch.zona', 'inventory']
      });
      return {
        zona: zona,
        inventarioTotal,
        mantenimietoTrue,
        mantenimietoFalse
      };
    });
    const response = await Promise.all(find);
    return response;
  }

  async update(id: number, updateResponsableDto: UpdateResponsableDto) {
    const exist = await this.responsableRepository.findOne(id);
    if (!exist) throw new BadRequestException('No existe el responsable');
    await this.responsableRepository.update(id, {
      user: updateResponsableDto.user,
      ranch: updateResponsableDto.ranch,
      inventory: updateResponsableDto.inventory
    });
    await this.historyService.create({
      inventario: updateResponsableDto.inventory,
      ranch: updateResponsableDto.ranch,
      user: updateResponsableDto.user
    });
    return 'Responsable actualizado';
  }

  async remove(id: number) {
    const exist = await this.responsableRepository.findOne(id);
    if (!exist) throw new BadRequestException('No existe el responsable');
    await this.responsableRepository.delete(id);
    return 'Responsable eliminado';
  }
}
