import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { History } from './entities/history.entity';
import { RanchModule } from 'src/ranch/ranch.module';
import { UsersModule } from 'src/users/users.module';
import { InventoryModule } from 'src/inventory/inventory.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([History]),
    RanchModule,
    UsersModule,
    InventoryModule
  ],
  controllers: [HistoryController],
  providers: [HistoryService]
})
export class HistoryModule {}
