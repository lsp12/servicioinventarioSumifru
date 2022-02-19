import { IsString, IsNumber, IsEnum } from 'class-validator';
import { MandatedStatus } from '../enum.mandated';

export class CreateMandatedDto {
  @IsString()
  name: string;

  @IsString()
  lastName: string;

  @IsString()
  phone: string;

  @IsEnum(MandatedStatus)
  role: MandatedStatus;

  @IsNumber()
  ranch: number;
}
