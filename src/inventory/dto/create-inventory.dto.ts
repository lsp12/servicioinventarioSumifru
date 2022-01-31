import { IsNumber, IsString } from 'class-validator';

export class CreateInventoryDto {
  @IsString()
  numSerie: string;

  @IsString()
  nombreProducto: string;

  @IsNumber()
  unitMd: number;

  @IsNumber()
  provider: number;
}
