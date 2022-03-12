import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Request,
  Headers,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from 'src/guards/rol.enum';
import { Roles } from 'src/guards/papeles.decorador';
import { GetToken } from 'src/responsable/dto/create-responsable.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('/login')
  login(@Body() login: CreateUserDto) {
    return this.usersService.login(login);
  }

  @Get('/myuser')
  myUser(@Headers() headers) {
    console.log(headers);
    return {
      id: headers.id,
      role: headers.role,
    };
  }

  @Get('/byId')
  findById(@Body() user: GetToken) {
    return this.usersService.findByUser(+user.token.user);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('/:nombre')
  findByNombre(@Param('nombre') nombre: string) {
    return this.usersService.findByNombre(nombre);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Put(':id')
  @Roles(Role.Admin)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
