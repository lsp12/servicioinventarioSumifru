import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  nombre: string;

  @IsString()
  role: string;

  @IsString()
  contraseña: string;
}
