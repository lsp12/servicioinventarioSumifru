import { IsNumber, IsString } from 'class-validator';
import { useDto } from 'src/responsable/dto/create-responsable.dto';

export class CreateMaintenanceDto {
  @IsString()
  motivo: string;

  @IsNumber()
  responsable: number;
}

export class GetToken {
  user: useDto;
}
