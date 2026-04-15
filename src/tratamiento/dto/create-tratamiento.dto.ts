import {
  IsNumber,
  IsString,
  IsDateString,
  IsOptional,
  Min,
  Length,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTratamientoDto {

  @Type(() => Number)
  @IsNumber()
  id_insumo: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  cantidadSugerida: number;

  @IsString()
  @Length(1, 100)
  tipoTratamiento: string;

  @Type(() => Number)
  @IsNumber()
  id_usuario: number;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsDateString()
  fechaAplicacion: string;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  cantidadUsada: number;

}