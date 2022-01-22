import { IsString } from 'class-validator';

export class CreateProviderDto {
  @IsString()
  nombre: string;
}
