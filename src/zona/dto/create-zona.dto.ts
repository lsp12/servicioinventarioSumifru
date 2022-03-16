import { IsNumber, IsString } from 'class-validator';

export class CreateZonaDto {
  @IsString()
  nombre: string;

  @IsNumber()
  users: number;
}
