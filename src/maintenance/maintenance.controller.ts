import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put
} from '@nestjs/common';
import { MaintenanceService } from './maintenance.service';
import { CreateMaintenanceDto, GetToken } from './dto/create-maintenance.dto';
import { UpdateMaintenanceDto } from './dto/update-maintenance.dto';

@Controller('maintenance')
export class MaintenanceController {
  constructor(private readonly maintenanceService: MaintenanceService) {}

  @Post()
  create(@Body() createMaintenanceDto: CreateMaintenanceDto) {
    return this.maintenanceService.create(createMaintenanceDto);
  }

  @Get()
  findAll() {
    return this.maintenanceService.findAll();
  }

  @Get('/user')
  findByUser(@Body('user') user: GetToken) {
    return this.maintenanceService.findByUser(+user.user);
    return user.user;
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.maintenanceService.findOne(+id);
  }

  @Put('/:id')
  update(
    @Param('id') id: string,
    @Body() updateMaintenanceDto: UpdateMaintenanceDto
  ) {
    console.log(updateMaintenanceDto);
    return this.maintenanceService.update(+id, updateMaintenanceDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.maintenanceService.remove(+id);
  }
}
