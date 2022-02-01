import { IsNumber, IsString } from 'class-validator';

export class CreateResponsableDto {
  @IsNumber()
  ranch: number;

  @IsNumber()
  inventory: number;

  @IsNumber()
  user: number;
}

export class useDto {
  user: string;
  role: string;
  nombre: string;
}

export class GetToken {
  user: useDto;
}
