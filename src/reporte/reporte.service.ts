import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReporteDto } from './dto/create-reporte.dto';
import { UpdateReporteDto } from './dto/update-reporte.dto';
import { Reporte } from './entities/reporte.entity';

@Injectable()
export class ReporteService {
  constructor(
    @InjectRepository(Reporte)
    private reporteRepository: Repository<Reporte>
  ) {}

  async create(createReporteDto: CreateReporteDto) {
    const reporte = this.reporteRepository.create(createReporteDto);
    await this.reporteRepository.save(reporte);
    return await this.reporteRepository.findOne(
      {
        idReporte: reporte.idReporte
      },
      {
        relations: ['responsable', 'responsable.inventory']
      }
    );
  }

  async findAll() {
    const reportes = await this.reporteRepository.find({
      relations: ['responsable', 'responsable.inventory']
    });
    return reportes;
  }

  async findByUser(id: number) {
    const reportes = await this.reporteRepository.find({
      where: {
        responsable: {
          user: {
            idUsuario: id
          }
        }
      },
      relations: ['responsable', 'responsable.inventory']
    });
    if (reportes.length > 0) {
      return reportes;
    } else {
      return [];
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} reporte`;
  }

  async update(id: number, updateReporteDto: UpdateReporteDto) {
    const reporte = await this.reporteRepository.findOne(id);
    if (!reporte) throw new BadRequestException('No existe el reporte');
    await this.reporteRepository.update(id, updateReporteDto);
    await this.reporteRepository.save(reporte);
    return await this.reporteRepository.findOne(
      {
        idReporte: reporte.idReporte
      },
      {
        relations: ['responsable', 'responsable.inventory']
      }
    );
  }

  async remove(id: number) {
    const reporte = await this.reporteRepository.findOne(id);
    if (!reporte) throw new BadRequestException('No existe el reporte');
    await this.reporteRepository.remove(reporte);
    return 'Reporte eliminado';
  }
}
