import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post()
  create(@Body() createInventoryDto: CreateInventoryDto) {
    return this.inventoryService.create(createInventoryDto);
  }

  @Get()
  findAll() {
    return this.inventoryService.findAll();
  }

  @Get('/findByCategory/:category')
  findByCategory(@Param('category') category: string) {
    return this.inventoryService.findByCategory(+category);
  }

  @Get('/findLocation')
  findLocation() {
    return this.inventoryService.findLocation();
  }

  @Get('/count')
  count() {
    return this.inventoryService.findAllCount();
  }

  @Get('/findByInUse')
  findByInUse() {
    return this.inventoryService.findByInUse();
  }

  @Get('/mantenimiento')
  findMaintenanceItem() {
    return this.inventoryService.findMaintenanceItem();
  }

  @Get('/findNotRelatedResponsable')
  findNotRelatedResponsable() {
    return this.inventoryService.findNotRelatedResponsable();
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateInventoryDto: UpdateInventoryDto,
  ) {
    return this.inventoryService.update(+id, updateInventoryDto);
  }

  @Put('/updatemantenimieto/:id')
  updateMantenimieto(@Param('id') id: string, @Body() mantenimieto: boolean) {
    return this.inventoryService.updateMantenimieto(+id, mantenimieto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inventoryService.remove(+id);
  }
}
