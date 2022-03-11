import { Module } from '@nestjs/common';
import { ResponsableService } from './responsable.service';
import { ResponsableController } from './responsable.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Responsable } from './entities/responsable.entity';
import { HistoryModule } from 'src/history/history.module';
import { ZonaModule } from 'src/zona/zona.module';
import { InventoryModule } from 'src/inventory/inventory.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Responsable]),
    HistoryModule,
    ZonaModule,
    InventoryModule,
  ],
  controllers: [ResponsableController],
  providers: [ResponsableService],
})
export class ResponsableModule {}
