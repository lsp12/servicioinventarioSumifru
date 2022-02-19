import { PartialType } from '@nestjs/mapped-types';
import { CreateMandatedDto } from './create-mandated.dto';

export class UpdateMandatedDto extends PartialType(CreateMandatedDto) {}
