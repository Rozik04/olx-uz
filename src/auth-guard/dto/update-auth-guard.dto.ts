import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthGuardDto } from './create-auth-guard.dto';

export class UpdateAuthGuardDto extends PartialType(CreateAuthGuardDto) {}
