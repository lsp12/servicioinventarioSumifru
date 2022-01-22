import { IsString } from 'class-validator';

export class CreateUnitMdDto {
  @IsString()
  tipoUnida: string;
}
