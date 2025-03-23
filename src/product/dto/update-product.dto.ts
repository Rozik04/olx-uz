import { ProductStatus, ProductType } from '@prisma/client';
import { IsBoolean, IsNumber, IsString, IsOptional } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  image: string;

  @IsNumber()
  @IsOptional()
  userID: number;

  @IsNumber()
  @IsOptional()
  price: number;

  @IsString()
  @IsOptional()
  type: ProductType;

  @IsBoolean()
  @IsOptional()
  available: boolean;

  @IsNumber()
  @IsOptional()
  colorID?: number;

  @IsNumber()
  @IsOptional()
  categoryID?: number;

  @IsString()
  @IsOptional()
  status: ProductStatus;

  @IsBoolean()
  @IsOptional()
  negotiable: boolean;
}
