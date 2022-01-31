import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryService } from 'src/category/category.service';
import { ProviderService } from 'src/provider/provider.service';
import { UnitMdService } from 'src/unit-md/unit-md.service';
import { Repository } from 'typeorm';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { Inventory } from './entities/inventory.entity';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory)
    private inventoryRepository: Repository<Inventory>,
    private categoryService: CategoryService,
    private providerService: ProviderService,
    private unitMdService: UnitMdService
  ) {}

  async create(createInventoryDto: CreateInventoryDto) {
    const { unitMd, provider } = createInventoryDto;
    const inventario = await this.inventoryRepository.save(createInventoryDto);
    return await this.inventoryRepository.findOne(
      {
        idInventario: inventario.idInventario
      },
      {
        relations: ['unitMd', 'provider', 'category']
      }
    );
  }

  async findAll() {
    const inventories = await this.inventoryRepository.find({
      relations: ['unitMd', 'provider', 'category']
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
      where: { category: { idCategoria: id } }
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

  async remove(id: number) {
    const inventory = await this.inventoryRepository.findOne(id);
    if (!inventory) throw new BadRequestException('No existe el inventario');
    await this.inventoryRepository.remove(inventory);
    return 'Inventario eliminado';
  }
}
