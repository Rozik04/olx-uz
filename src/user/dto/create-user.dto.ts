import { IsEmail, IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { UserType } from '@prisma/client';


export class CreateUserDto {
  @IsString()
  fullname: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsEnum(UserType)
  type: UserType;

  @IsInt()
  @IsOptional()
  regionID: number;
}
