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

@Module({
  imports: [
    CategoryModule,
    ProviderModule,
    UsersModule,
    UnitMdModule,
    MaintenanceModule,
    InventoryModule,
    ResponsableModule,
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
        }),
    }),
    RanchModule
  ],
  controllers: [AppController],
  providers: [AppService, ValidationPipe]
})
export class AppModule { }
