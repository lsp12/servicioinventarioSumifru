import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryService } from 'src/category/category.service';
import { ProviderService } from 'src/provider/provider.service';
import { UnitMdService } from 'src/unit-md/unit-md.service';
import { In, Repository } from 'typeorm';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { Inventory } from './entities/inventory.entity';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory)
    private inventoryRepository: Repository<Inventory>,
  ) {}

  async create(createInventoryDto: CreateInventoryDto) {
    console.log(createInventoryDto);
    const { numSerie } = createInventoryDto;
    const codes = numSerie.split(',');
    console.log(codes);
    const exist = await this.inventoryRepository.findOne({
      where: { numSerie: In(codes) },
    });
    console.log(exist);
    if (exist) throw new BadRequestException('El inventario ya existe');
    await codes.map(async (code) => {
      await this.inventoryRepository.save({
        ...createInventoryDto,
        numSerie: code,
      });
    });
    return 'Inventario creado';
  }

  async findAll() {
    const inventories = await this.inventoryRepository.find({
      relations: ['unitMd', 'provider', 'category'],
    });
    if (inventories.length > 0) {
      return inventories;
    } else {
      throw new BadRequestException('No existen inventarios');
    }
  }

  async findLocation() {
    const inventories = await this.inventoryRepository.find({
      relations: [
        'responsables',
        'responsables.ranch',
        'responsables.ranch.zona',
        'category',
      ],
    });
    if (inventories.length > 0) {
      return inventories;
    } else {
      throw new BadRequestException('No existen inventarios');
    }
  }

  async findAllCount() {
    const inventories = await this.inventoryRepository.count();
    const inventoriesMantenimiento = await this.inventoryRepository.count({
      where: { mantenimieto: true },
    });
    const inventoriesNoMantenimiento = await this.inventoryRepository.count({
      where: { mantenimieto: false },
    });
    return {
      total: inventories,
      enMantenimiento: inventoriesMantenimiento,
      enUso: inventoriesNoMantenimiento,
    };
  }

  async findByUser(id: number) {
    const inventories = await this.inventoryRepository.find({
      where: {
        user: {
          idUsuario: id,
        },
      },
      relations: ['unitMd', 'provider', 'category'],
    });
    if (inventories.length > 0) {
      return inventories;
    } else {
      throw new BadRequestException('No existen inventarios');
    }
  }

  async findOne(id: number) {
    const inventory = await this.inventoryRepository.findOne(id);
    if (!inventory) throw new BadRequestException('No existe el inventario');
    return inventory;
  }

  async findByCategory(id: number) {
    const inventories = await this.inventoryRepository.find({
      relations: ['unitMd', 'provider', 'category'],
      where: { category: { idCategoria: id }, inUse: false },
    });
    if (inventories.length > 0) {
      return inventories;
    } else {
      return [];
    }
  }

  async findMaintenanceItem() {
    console.log('entro');
    const inventories = await this.inventoryRepository.find({
      where: { mantenimieto: false },
      relations: ['unitMd', 'provider', 'category'],
    });
    if (inventories.length > 0) {
      return inventories;
    } else {
      return [];
    }
  }

  async findNotRelatedResponsable() {
    const inventories = await this.inventoryRepository.find({
      relations: ['responsables'],
    });
    if (inventories.length > 0) {
      return inventories;
    } else {
      return [];
    }
  }

  async findByInUse() {
    const inventories = await this.inventoryRepository.find({
      where: { inUse: false },
      relations: ['unitMd', 'provider', 'category'],
    });
    if (inventories.length > 0) {
      return inventories;
    } else {
      return [];
    }
  }

  async update(id: number, updateInventoryDto: UpdateInventoryDto) {
    const exist = await this.inventoryRepository.findOne(id);
    if (!exist) throw new BadRequestException('No existe el inventario');
    await this.inventoryRepository.update(id, updateInventoryDto);

    return 'Inventario actualizado';
  }

  async updateMantenimieto(id: number, mantenimieto: boolean) {
    const exist = await this.inventoryRepository.findOne(id);
    if (!exist) throw new BadRequestException('No existe el inventario');
    await this.inventoryRepository.update(id, { mantenimieto });
    return 'Mantenimiento actualizado';
  }

  async updateInUse(id: number, inUse: boolean) {
    const inventory = await this.inventoryRepository.findOne(id);
    if (!inventory) throw new BadRequestException('No existe el inventario');
    await this.inventoryRepository.update(id, { inUse });
    return 'Inventario actualizado';
  }

  async remove(id: number) {
    const inventory = await this.inventoryRepository.findOne(id);
    if (!inventory) throw new BadRequestException('No existe el inventario');
    await this.inventoryRepository.remove(inventory);
    return 'Inventario eliminado';
  }
}
