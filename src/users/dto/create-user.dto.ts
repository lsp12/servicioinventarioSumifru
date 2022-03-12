import { IsOptional, IsString } from 'class-validator';
import { Role } from 'src/role/entities/role.entity';

export class CreateUserDto {
  @IsString()
  @IsOptional()
  nombre: string;

  @IsString()
  numCedula: string;

  @IsOptional()
  role: number | Role;

  @IsString()
  contraseña: string;
}
