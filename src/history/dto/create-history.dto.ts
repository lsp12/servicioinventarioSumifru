import { IsNumber, IsOptional } from 'class-validator';

export class CreateHistoryDto {
  @IsOptional()
  fechaMovimiento: Date;

  @IsNumber()
  inventario: number;

  @IsNumber()
  user: number;

  @IsNumber()
  ranch: number;
}
