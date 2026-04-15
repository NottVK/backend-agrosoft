import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';
export class CreateCultivoRealDto {
  @IsDateString()
  StartDate: Date;

  @IsNumber()
  Area: number;

  @IsOptional()
  @IsString()
  status?: string;
}
