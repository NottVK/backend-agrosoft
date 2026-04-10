import { IsString, IsNumber, IsOptional, Min, IsIn } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateInsumoDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  category: string;

  @IsOptional()
  @IsString()
  unit: string;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  availableQuantity: number;

  @IsOptional()
  @IsString()
  @IsIn(['active', 'inactive'])
  status?: string;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  unitPrice: number;
}
