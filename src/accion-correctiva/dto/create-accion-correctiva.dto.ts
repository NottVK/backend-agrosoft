import {
  IsDateString,
  IsNumber,
  Min,
  IsString,
  Length,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAccionCorrectivaDto {

  @IsDateString()
  fechaAtencion: string;

  @IsString()
  @Length(1, 500)
  resultadoPreliminar: string;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  cantidadUsada: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  costoAplicado: number;
}
