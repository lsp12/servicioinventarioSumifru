import { IsNumber, IsString } from 'class-validator';

export class CreateInventoryDto {
  @IsString()
  numSerie: string;

  @IsString()
  nombreProducto: string;

  @IsNumber()
  cantidad: number;

  @IsNumber()
  category: number;

  @IsNumber()
  unitMd: number;

  @IsNumber()
  provider: number;
}
