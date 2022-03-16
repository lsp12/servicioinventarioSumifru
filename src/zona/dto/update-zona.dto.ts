import { PartialType } from '@nestjs/mapped-types';
import { CreateZonaDto } from './create-zona.dto';

export class UpdateZonaDto extends PartialType(CreateZonaDto) {}

export class UpdateUser {
  users: number;
  idZona: number;
}
