import { IsString } from 'class-validator';

export class CreateZonaDto {
  @IsString()
  nombre: string;
}
