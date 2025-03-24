import { IsInt } from 'class-validator';

export class CreateLikeDto {
  @IsInt()
  userID: number;

  @IsInt()
  productID: number;
}
