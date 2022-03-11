import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common';
import { MandatedService } from './mandated.service';
import { CreateMandatedDto } from './dto/create-mandated.dto';
import { UpdateMandatedDto } from './dto/update-mandated.dto';

@Controller('mandated')
export class MandatedController {
  constructor(private readonly mandatedService: MandatedService) {}

  @Post()
  create(@Body() createMandatedDto: CreateMandatedDto) {
    return this.mandatedService.create(createMandatedDto);
  }

  @Get('/findByRanch/:id')
  findByRanch(@Param('id') id: string) {
    return this.mandatedService.findByRanch(+id);
  }

  @Get()
  findAll() {
    return this.mandatedService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mandatedService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMandatedDto: UpdateMandatedDto
  ) {
    return this.mandatedService.update(+id, updateMandatedDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mandatedService.remove(+id);
  }
}
