import { PartialType } from '@nestjs/mapped-types';
import { CreateViewingDto } from './create-viewing.dto';

export class UpdateViewingDto extends PartialType(CreateViewingDto) {}
