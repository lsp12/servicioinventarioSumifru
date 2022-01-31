import { IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  nombre: string;

  @IsString()
  @IsOptional()
  role: string;

  @IsString()
  contraseña: string;
}
