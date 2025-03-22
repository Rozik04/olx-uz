
import { IsOptional, IsString } from 'class-validator';

export class UpdateRegionDto  {
        @IsString()
        @IsOptional()
        name:string
}
