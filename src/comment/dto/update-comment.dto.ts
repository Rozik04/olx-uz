import { IsInt, IsString, Min, Max, IsOptional } from 'class-validator';

export class UpdateCommentDto {
  @IsString()
  @IsOptional()
  msg?: string;

  @IsInt()
  @Min(1)
  @Max(5)
  @IsOptional()
  star?: number;
}
