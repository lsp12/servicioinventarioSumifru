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
    console.log(createMaintenanceDto, 'DAatooooos');
    return this.maintenanceService.createMaintenance(createMaintenanceDto);
  }

  @Get()
  findAll() {
    return this.maintenanceService.findAll();
  }

  @Get('/user')
  findByUser(@Body('token') user: GetToken) {
    return this.maintenanceService.findByUser(+user.user);
  }

  @Get('/findByRanch/:id')
  findByRanch(@Param('id') id: string) {
    return this.maintenanceService.findByRanch(+id);
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
    return this.maintenanceService.UpdateI(+id, updateMaintenanceDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.maintenanceService.remove(+id);
  }
}
