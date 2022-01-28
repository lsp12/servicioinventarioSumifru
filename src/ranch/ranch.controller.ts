import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put
} from '@nestjs/common';
import { RanchService } from './ranch.service';
import { CreateRanchDto } from './dto/create-ranch.dto';
import { UpdateRanchDto } from './dto/update-ranch.dto';

@Controller('ranch')
export class RanchController {
  constructor(private readonly ranchService: RanchService) {}

  @Post()
  create(@Body() createRanchDto: CreateRanchDto) {
    return this.ranchService.create(createRanchDto);
  }

  @Get()
  findAll() {
    return this.ranchService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ranchService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateRanchDto: UpdateRanchDto) {
    return this.ranchService.update(+id, updateRanchDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ranchService.remove(+id);
  }
}
