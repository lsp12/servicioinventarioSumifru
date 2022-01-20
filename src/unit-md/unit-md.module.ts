import { Module } from '@nestjs/common';
import { UnitMdService } from './unit-md.service';
import { UnitMdController } from './unit-md.controller';

@Module({
  controllers: [UnitMdController],
  providers: [UnitMdService]
})
export class UnitMdModule {}
