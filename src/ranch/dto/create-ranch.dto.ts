import { IsNumber, IsString } from 'class-validator';

export class CreateRanchDto {
  @IsString()
  nombre: string;

  @IsString()
  condigoHacienda: string;

  @IsNumber()
  zona: number;
}
