import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common';
import { UnitMdService } from './unit-md.service';
import { CreateUnitMdDto } from './dto/create-unit-md.dto';
import { UpdateUnitMdDto } from './dto/update-unit-md.dto';

@Controller('unid')
export class UnitMdController {
  constructor(private readonly unitMdService: UnitMdService) {}

  @Post()
  create(@Body() createUnitMdDto: CreateUnitMdDto) {
    return this.unitMdService.create(createUnitMdDto);
  }

  @Post('/many')
  createMany(@Body() createUnitMdDto: CreateUnitMdDto[]) {
    console.log(createUnitMdDto);
    /* return this.unitMdService.createMany(createUnitMdDto); */
  }

  @Get()
  findAll() {
    return this.unitMdService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.unitMdService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUnitMdDto: UpdateUnitMdDto) {
    return this.unitMdService.update(+id, updateUnitMdDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.unitMdService.remove(+id);
  }

  @Post('/delete')
  removeMany(@Body() id: number) {
    return this.unitMdService.remove(id);
  }
}
