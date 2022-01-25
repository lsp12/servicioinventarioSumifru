/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { ProviderModule } from './provider/provider.module';
import { UsersModule } from './users/users.module';
import { UnitMdModule } from './unit-md/unit-md.module';
import { MaintenanceModule } from './maintenance/maintenance.module';
import { InventoryModule } from './inventory/inventory.module';
import { ResponsableModule } from './responsable/responsable.module';
import { ValidationPipe } from './validation.pipe';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';
import { RanchModule } from './ranch/ranch.module';
import { HistoryModule } from './history/history.module';

@Module({
  imports: [
    CategoryModule,
    ProviderModule,
    UsersModule,
    UnitMdModule,
    MaintenanceModule,
    InventoryModule,
    ResponsableModule,
    RanchModule,
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
        }),
    }),
    HistoryModule,
    
  ],
  controllers: [AppController],
  providers: [AppService, ValidationPipe]
})
export class AppModule { }
