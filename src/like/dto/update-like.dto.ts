import { IsInt, IsOptional } from 'class-validator';

export class UpdateLikeDto {
  @IsOptional()
  @IsInt()
  userID?: number;

  @IsOptional()
  @IsInt()
  productID?: number;
}
