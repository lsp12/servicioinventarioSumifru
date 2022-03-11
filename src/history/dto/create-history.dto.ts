import { IsNumber, IsOptional } from 'class-validator';

export class CreateHistoryDto {
  @IsNumber()
  inventario: number;

  @IsNumber()
  user: number;

  @IsNumber()
  ranch: number;
}
