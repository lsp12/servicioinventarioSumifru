/* eslint-disable prettier/prettier */
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
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
import { LoggerMiddleware } from './middleware/loggerMiddleware';
import { RolesGuard } from './guards/roles.guard';
import { APP_GUARD } from '@nestjs/core';
import { UsersController } from './users/users.controller';
import { ReporteModule } from './reporte/reporte.module';
import { ResponsableController } from './responsable/responsable.controller';
import { MaintenanceController } from './maintenance/maintenance.controller';
import { ReporteController } from './reporte/reporte.controller';
import {ZonaModule} from './zona/zona.module';
import { CategoryController } from './category/category.controller';
import { DocModule } from './doc/doc.module';
import { MulterModule } from '@nestjs/platform-express';

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
    HistoryModule,
    ReporteModule,
    ZonaModule,
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
        }),
    }),
    DocModule,
    MulterModule.register({
      dest: './files',
    })
    
  ],
  controllers: [AppController],
  providers: [AppService, ValidationPipe,{provide: APP_GUARD,
    useClass: RolesGuard,}]
})
export class AppModule {
  configure(consume: MiddlewareConsumer) {
    consume
      .apply(LoggerMiddleware)
      .exclude(
       {path:"/users/login", method: RequestMethod.POST},
       {path:"/users", method: RequestMethod.POST},
       {path:"responsable/count/zona", method: RequestMethod.GET},
      )
      .forRoutes(
        UsersController,
        ResponsableController,
        MaintenanceController,
        ReporteController,
        CategoryController
        );
  }
 }
