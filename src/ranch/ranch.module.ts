import { Module } from '@nestjs/common';
import { RanchService } from './ranch.service';
import { RanchController } from './ranch.controller';

@Module({
  controllers: [RanchController],
  providers: [RanchService]
})
export class RanchModule {}
