import { IsInt, IsString, IsNotEmpty, Min, Max } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  msg: string;

  @IsInt()
  @Min(1)
  @Max(5)
  star: number;

  @IsInt()
  @IsNotEmpty()
  userID: number;

  @IsInt()
  @IsNotEmpty()
  productID: number;
}
