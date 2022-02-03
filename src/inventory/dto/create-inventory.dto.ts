import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateInventoryDto {
  @IsString()
  numSerie: string;

  @IsString()
  nombreProducto: string;

  @IsOptional()
  mantenimiento: boolean;

  @IsNumber()
  unitMd: number;

  @IsNumber()
  provider: number;
}
