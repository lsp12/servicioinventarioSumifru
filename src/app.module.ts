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
console.log("JONATHAN\\SQLEXPRESS");

@Module({
  imports: [
    CategoryModule,
    ProviderModule,
    UsersModule,
    UnitMdModule,
    MaintenanceModule,
    InventoryModule,
    ResponsableModule,
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'JONATHAN\\SQLEXPRESS',
      port: 1433,
      username: 'sa',
      password: 'root',
      database: 'servicioInventario',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true
    })
  ],
  controllers: [AppController],
  providers: [AppService, ValidationPipe]
})
export class AppModule {}
