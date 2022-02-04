import { IsNumber, IsOptional, IsString } from 'class-validator';
import { useDto } from 'src/responsable/dto/create-responsable.dto';

export class CreateMaintenanceDto {
  @IsOptional()
  numMantenimiento: number;

  @IsString()
  motivo: string;

  @IsNumber()
  responsable: number;

  @IsNumber()
  inventario: number;
}

export class GetToken {
  user: useDto;
}
