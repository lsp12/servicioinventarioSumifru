import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put
} from '@nestjs/common';
import { ResponsableService } from './responsable.service';
import {
  CreateResponsableDto,
  GetToken,
  useDto
} from './dto/create-responsable.dto';
import { UpdateResponsableDto } from './dto/update-responsable.dto';

@Controller('responsable')
export class ResponsableController {
  constructor(private readonly responsableService: ResponsableService) {}

  @Post()
  create(@Body() createResponsableDto: CreateResponsableDto) {
    return this.responsableService.create(createResponsableDto);
  }

  @Get('/oneresponsable')
  findOneResponsable(@Body() user: GetToken) {
    return this.responsableService.findByUser(+user.token.user);
    return user.token.user;
  }

  @Get('/findByRanch/:id')
  findByRanch(@Param('id') id: string) {
    return this.responsableService.findByRanch(+id);
  }

  @Get('/count/zona')
  findCountZona() {
    return this.responsableService.findCountZona();
  }

  @Get('/findNotRelated')
  findNotRelated() {
    console.log('findNotRelated');
    return this.responsableService.findNotRelated();
  }

  @Get()
  findAll() {
    return this.responsableService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.responsableService.findOne(+id);
  }

  @Get('/findByRanchMaintenance/:id')
  findByRanchMaintenance(@Param('id') id: string) {
    return this.responsableService.findByRanchMantenimiento(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateResponsableDto: UpdateResponsableDto
  ) {
    return this.responsableService.update(+id, updateResponsableDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.responsableService.remove(+id);
  }
}
