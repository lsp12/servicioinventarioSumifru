import { IsNumber, IsString } from 'class-validator';

export class CreateResponsableDto {
  @IsString()
  reporte: string;

  @IsString()
  estado: string;

  @IsNumber()
  ranch: number;

  @IsNumber()
  inventory: number;

  @IsNumber()
  user: number;
}
