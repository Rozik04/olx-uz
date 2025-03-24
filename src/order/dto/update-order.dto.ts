import { Decimal } from '@prisma/client/runtime/library';
import { IsDecimal, IsInt, IsOptional, Min } from 'class-validator';

export class UpdateOrderDto {
  @IsInt()
  @IsOptional()
  userID?: number;

  @IsInt()
  @IsOptional()
  productID?: number;

  @IsInt()
  @IsOptional()
  @Min(1)
  countOfProduct?: number;

    @IsDecimal()
    @IsOptional()
    totalPrice: Decimal;
}
