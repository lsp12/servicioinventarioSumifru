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

  async create(createMaintenanceDto: CreateMaintenanceDto) {
    console.log(createMaintenanceDto, 'createMaintenanceDto');
    const exist = await this.maintenanceRepository.findOne({
      where: {
        responsable: {
          inventory: createMaintenanceDto.inventory
        }
      },
      relations: ['responsable', 'responsable.inventory'],
      order: {
        idMantenimiento: 'DESC'
      }
    });
    exist.numMantenimiento += 1;

    createMaintenanceDto.numMantenimiento = exist?.numMantenimiento | 0;
    console.log(
      createMaintenanceDto,
      'maintenance-----------------------------'
    );
    const maintenance = this.maintenanceRepository.create(createMaintenanceDto);
    console.log(maintenance, 'maintenance-----------------------------');
    await this.maintenanceRepository.save(maintenance);
    await this.inventoryService.updateMantenimieto(
      createMaintenanceDto.inventory,
      true
    );
    return await this.maintenanceRepository.findOne(
      {
        idMantenimiento: maintenance.idMantenimiento
      },
      {
        relations: ['responsable', 'responsable.inventory']
      }
    );
  }

  async createMaintenance(createMaintenanceDto: CreateMaintenanceDto) {
    console.log(createMaintenanceDto, 'createMaintenanceDto');
    const exist = await this.maintenanceRepository.findOne({
      where: {
        inventory: createMaintenanceDto.inventory
      },
      relations: ['inventory'],
      order: {
        idMantenimiento: 'DESC'
      }
    });
    if (exist) exist.numMantenimiento += 1;
    createMaintenanceDto.numMantenimiento = exist?.numMantenimiento | 0;
    const maintenance = this.maintenanceRepository.create(createMaintenanceDto);
    console.log(maintenance);
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
        relations: ['inventory']
      }
    );
  }

  async findAll() {
    const maintenances = await this.maintenanceRepository.find({
      relations: ['inventory']
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
    await this.inventoryService.updateMantenimieto(
      updateMaintenanceDto.inventory,
      false
    );
    return await this.maintenanceRepository.findOne(
      {
        idMantenimiento: id
      },
      {
        relations: ['inventory']
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
