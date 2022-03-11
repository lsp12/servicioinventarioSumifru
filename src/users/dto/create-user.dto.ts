import { IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsOptional()
  nombre: string;

  @IsString()
  numCedula: string;

  @IsString()
  @IsOptional()
  role: string;

  @IsString()
  contraseña: string;
}
