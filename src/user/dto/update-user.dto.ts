import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional } from 'class-validator';
import { UserType } from '@prisma/client';


export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  fullname?: string;

  @IsOptional()
  email?: string;

  @IsOptional()
  password?: string;

  @IsOptional()
  phone?: string;

  @IsOptional()
  image?: string;

  @IsOptional()
  type?: UserType;

  @IsOptional()
  regionID?: number;
}
