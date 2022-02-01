import { IsNumber, IsString } from 'class-validator';

export class CreateReporteDto {
  @IsString()
  estado: string;

  @IsString()
  reporte: string;

  @IsNumber()
  responsable: number;
}
