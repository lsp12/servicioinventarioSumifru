import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventory } from './entities/inventory.entity';
import { UnitMdModule } from 'src/unit-md/unit-md.module';
import { ProviderModule } from 'src/provider/provider.module';
import { CategoryModule } from 'src/category/category.module';
import { UnitMd } from 'src/unit-md/entities/unit-md.entity';
import { Provider } from 'src/provider/entities/provider.entity';
import { Category } from 'src/category/entities/category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Inventory]),
    UnitMdModule,
    ProviderModule,
    CategoryModule
  ],
  controllers: [InventoryController],
  providers: [InventoryService]
})
export class InventoryModule {}
