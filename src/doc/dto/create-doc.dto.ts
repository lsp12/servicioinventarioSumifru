import { IsString } from 'class-validator';

export class CreateDocDto {
  @IsString()
  departamento: string;
  @IsString()
  nSemanas: string;
}
