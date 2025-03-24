import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateLikeDto {
  @IsInt()
  @IsNotEmpty()
  userID: number;

  @IsInt()
  @IsNotEmpty()
  productID: number;
}
