import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put
} from '@nestjs/common';
import { ReporteService } from './reporte.service';
import { CreateReporteDto } from './dto/create-reporte.dto';
import { UpdateReporteDto } from './dto/update-reporte.dto';

@Controller('reporte')
export class ReporteController {
  constructor(private readonly reporteService: ReporteService) {}

  @Post()
  create(@Body() createReporteDto: CreateReporteDto) {
    return this.reporteService.create(createReporteDto);
  }

  @Get('/user')
  findByUser(@Body() user) {
    return this.reporteService.findByUser(+user.token.user);
  }

  @Get()
  findAll() {
    return this.reporteService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.reporteService.findOne(+id);
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() updateReporteDto: UpdateReporteDto) {
    return this.reporteService.update(+id, updateReporteDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.reporteService.remove(+id);
  }
}
