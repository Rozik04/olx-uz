import { PartialType } from '@nestjs/mapped-types';
import { CreateTemporaryDto } from './create-temporary.dto';

export class UpdateTemporaryDto extends PartialType(CreateTemporaryDto) {}
