import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InventoryService } from 'src/inventory/inventory.service';
import { Repository } from 'typeorm';
import { CreateMaintenanceDto } from './dto/create-maintenance.dto';
import { UpdateMaintenanceDto } from './dto/update-maintenance.dto';
import { Maintenance } from './entities/maintenance.entity';

@Injectable()
export class MaintenanceService {
  constructor(
    @InjectRepository(Maintenance)
    private maintenanceRepository: Repository<Maintenance>,
    private readonly inventoryService: InventoryService
  ) {}

  async createMaintenance(createMaintenanceDto: CreateMaintenanceDto) {
    const exist = await this.maintenanceRepository.findOne({
      where: {
        responsable: createMaintenanceDto.responsable
      },
      relations: ['responsable'],
      order: {
        idMantenimiento: 'DESC'
      }
    });
    if (exist) exist.numMantenimiento += 1;
    createMaintenanceDto.numMantenimiento = exist?.numMantenimiento | 1;
    const maintenance = this.maintenanceRepository.create(createMaintenanceDto);
    await this.inventoryService.updateMantenimieto(
      createMaintenanceDto.inventory,
      true
    );
    await this.maintenanceRepository.save(maintenance);
    return await this.maintenanceRepository.findOne(
      {
        idMantenimiento: maintenance.idMantenimiento
      },
      {
        relations: ['responsable', 'responsable.inventory']
      }
    );
  }

  async findAll() {
    const maintenances = await this.maintenanceRepository.find({
      relations: ['responsable', 'responsable.inventory']
    });
    return maintenances;
  }

  async findByUser(id: number) {
    const maintenances = await this.maintenanceRepository.find({
      where: {
        responsable: {
          user: id
        }
      },
      relations: ['responsable', 'responsable.inventory'],
      order: {
        idMantenimiento: 'DESC'
      }
    });
    if (maintenances.length > 0) {
      return maintenances;
    } else {
      return [];
    }
  }

  async findOne(id: number) {
    const maintenance = await this.maintenanceRepository.find({
      where: {
        idMantenimiento: id
      },
      relations: ['responsable']
    });
    if (!maintenance)
      throw new BadRequestException('No existe el mantenimiento');
    return maintenance;
  }

  async findByRanch(id: number) {
    const maintenances = await this.maintenanceRepository.find({
      where: {
        responsable: {
          ranch: id
        }
      },
      relations: ['responsable', 'responsable.inventory'],
      order: {
        idMantenimiento: 'DESC'
      }
    });
    return maintenances;
  }

  async update(id: number, updateMaintenanceDto: UpdateMaintenanceDto) {
    const maintenance = await this.maintenanceRepository.findOne(id);
    if (!maintenance)
      throw new BadRequestException('No existe el mantenimiento');
    await this.maintenanceRepository.update(id, {
      estado: true
    });
    await this.inventoryService.updateMantenimieto(
      updateMaintenanceDto.inventory,
      false
    );
    return await this.maintenanceRepository.findOne(
      {
        idMantenimiento: id
      },
      {
        relations: ['responsable', 'responsable.inventory']
      }
    );
  }

  async UpdateI(id: number, updateMaintenanceDto: UpdateMaintenanceDto) {
    const maintenance = await this.maintenanceRepository.findOne(id);
    if (!maintenance)
      throw new BadRequestException('No existe el mantenimiento');
    await this.maintenanceRepository.update(id, {
      estado: true
    });
    console.log('estamos hacas', updateMaintenanceDto);
    const ivnentoryupdate = await this.inventoryService.updateMantenimieto(
      updateMaintenanceDto.inventory,
      false
    );
    console.log('estamos aqui', ivnentoryupdate);
    return await this.maintenanceRepository.findOne(
      {
        idMantenimiento: id
      },
      {
        relations: ['responsable', 'responsable.inventory']
      }
    );
  }

  async remove(id: number) {
    const maintenance = await this.maintenanceRepository.findOne(id);
    if (!maintenance)
      throw new BadRequestException('No existe el mantenimiento');
    await this.maintenanceRepository.remove(maintenance);
    return 'Mantenimiento eliminado';
  }
}
