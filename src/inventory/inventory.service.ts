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
    const { unitMd, provider, category } = createInventoryDto;
    const unitMdEntity = await this.unitMdService.findOne(unitMd);
    const providerEntity = await this.providerService.findOne(provider);
    const categoryEntity = await this.categoryService.findOne(category);
    const inventory = this.inventoryRepository.create({
      ...createInventoryDto,
      unitMd: unitMdEntity,
      provider: providerEntity,
      category: categoryEntity
    });
    return this.inventoryRepository.save(inventory);
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

  async update(id: number, updateInventoryDto: UpdateInventoryDto) {
    const exist = await this.inventoryRepository.findOne(id);

    if (!exist) throw new BadRequestException('No existe el inventario');

    const { unitMd, provider, category } = updateInventoryDto;
    const unitMdEntity = await this.unitMdService.findOne(unitMd);
    const providerEntity = await this.providerService.findOne(provider);
    const categoryEntity = await this.categoryService.findOne(category);
    const inventory = this.inventoryRepository.create({
      ...updateInventoryDto,
      unitMd: unitMdEntity,
      provider: providerEntity,
      category: categoryEntity
    });
    await this.inventoryRepository.update(id, inventory);

    return 'Inventario actualizado';
  }

  async remove(id: number) {
    const inventory = await this.inventoryRepository.findOne(id);
    if (!inventory) throw new BadRequestException('No existe el inventario');
    await this.inventoryRepository.remove(inventory);
    return 'Inventario eliminado';
  }
}
