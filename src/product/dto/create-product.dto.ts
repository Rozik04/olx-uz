import { IsBoolean, IsNumber, IsString, IsNotEmpty } from 'class-validator';
import { ProductStatus, ProductType } from '@prisma/client';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsNumber()
  @IsNotEmpty()
  userID: number;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  type: ProductType;

  @IsBoolean()
  @IsNotEmpty()
  available: boolean;

  @IsNumber()
  @IsNotEmpty()
  colorID?: number;

  @IsNumber()
  @IsNotEmpty()
  categoryID?: number;

  @IsString()
  @IsNotEmpty()
  status: ProductStatus;

  @IsBoolean()
  @IsNotEmpty()
  negotiable: boolean;
}
