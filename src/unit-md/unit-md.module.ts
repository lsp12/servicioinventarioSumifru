import { Module } from '@nestjs/common';
import { UnitMdService } from './unit-md.service';
import { UnitMdController } from './unit-md.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnitMd } from './entities/unit-md.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UnitMd])],
  controllers: [UnitMdController],
  providers: [UnitMdService],
  exports: [UnitMdService]
})
export class UnitMdModule {}
