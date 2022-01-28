import { IsOptional, IsString } from 'class-validator';

export class CreateProviderDto {
  @IsString()
  nombre: string;

  @IsString()
  direccion: string;

  @IsString()
  telefono: string;

  @IsOptional()
  email: string;
}
