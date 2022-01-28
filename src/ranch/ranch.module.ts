import { Module } from '@nestjs/common';
import { RanchService } from './ranch.service';
import { RanchController } from './ranch.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ranch } from './entities/ranch.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ranch])],
  controllers: [RanchController],
  providers: [RanchService],
  exports: [RanchService]
})
export class RanchModule {}
