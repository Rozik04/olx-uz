import { PartialType } from '@nestjs/mapped-types';
import { CreateBaseDatumDto } from './create-base-datum.dto';

export class UpdateBaseDatumDto extends PartialType(CreateBaseDatumDto) {}
