import { PartialType } from '@nestjs/mapped-types';
import { CreateRanchDto } from './create-ranch.dto';

export class UpdateRanchDto extends PartialType(CreateRanchDto) {}
