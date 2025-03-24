import { Decimal } from '@prisma/client/runtime/library';
import { IsDecimal, IsInt, IsNotEmpty, IsOptional, Min } from 'class-validator';

export class CreateOrderDto {
  @IsInt()
  @IsNotEmpty()
  userID: number;

  @IsInt()
  @IsNotEmpty()
  productID: number;

  @IsInt()
  @IsNotEmpty()
  countOfProduct: number;

  @IsDecimal()
  @IsOptional()
  totalPrice: Decimal;
  

}
