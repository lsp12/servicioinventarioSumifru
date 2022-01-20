import { Module } from '@nestjs/common';
import { ResponsableService } from './responsable.service';
import { ResponsableController } from './responsable.controller';

@Module({
  controllers: [ResponsableController],
  providers: [ResponsableService]
})
export class ResponsableModule {}
