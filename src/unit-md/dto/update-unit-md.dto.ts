import { PartialType } from '@nestjs/mapped-types';
import { CreateUnitMdDto } from './create-unit-md.dto';

export class UpdateUnitMdDto extends PartialType(CreateUnitMdDto) {}
