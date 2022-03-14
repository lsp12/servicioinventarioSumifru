import {
  MiddlewareConsumer,
  Module,
  RequestMethod,
  ValidationPipe,
} from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryController } from './category/category.controller';
import { CategoryModule } from './category/category.module';
import { DocModule } from './doc/doc.module';
import { RolesGuard } from './guards/roles.guard';
import { HistoryModule } from './history/history.module';
import { InventoryModule } from './inventory/inventory.module';
import { MaintenanceController } from './maintenance/maintenance.controller';
import { MaintenanceModule } from './maintenance/maintenance.module';
import { MandatedModule } from './mandated/mandated.module';
import { LoggerMiddleware } from './middleware/loggerMiddleware';
import { ProviderModule } from './provider/provider.module';
import { RanchModule } from './ranch/ranch.module';
import { ReporteController } from './reporte/reporte.controller';
import { ReporteModule } from './reporte/reporte.module';
import { ResponsableController } from './responsable/responsable.controller';
import { ResponsableModule } from './responsable/responsable.module';
import { RoleModule } from './role/role.module';
import { UnitMdModule } from './unit-md/unit-md.module';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { ZonaModule } from './zona/zona.module';
import { AssignmentModule } from './assignment/assignment.module';

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
    RoleModule,
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
        }),
    }),
    DocModule,
    MulterModule.register({
      dest: './files',
    }),
    MandatedModule,
    AssignmentModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ValidationPipe,
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule {
  configure(consume: MiddlewareConsumer) {
    consume
      .apply(LoggerMiddleware)
      .exclude(
        { path: '/users/login', method: RequestMethod.POST },
        { path: '/users', method: RequestMethod.POST },
        { path: 'responsable/count/zona', method: RequestMethod.GET },
      )
      .forRoutes(
        UsersController,
        ResponsableController,
        MaintenanceController,
        ReporteController,
        CategoryController,
      );
  }
}
