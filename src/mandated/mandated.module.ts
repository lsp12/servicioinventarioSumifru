import { Module } from '@nestjs/common';
import { MandatedService } from './mandated.service';
import { MandatedController } from './mandated.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mandated } from './entities/mandated.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mandated])],
  controllers: [MandatedController],
  providers: [MandatedService]
})
export class MandatedModule {}
