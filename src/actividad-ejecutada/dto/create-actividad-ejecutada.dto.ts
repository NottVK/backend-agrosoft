import {
  IsDateString,
  IsNumber,
  Min,
  IsOptional,
  IsString,
} from 'class-validator';
export class CreateActividadEjecutadaDto {
  @IsDateString()
  fechaEjecucion: Date;

  @IsNumber()
  @Min(0)
  CantidadUsada: number;

  @IsNumber()
  @Min(0)
  CostoAplicado: number;

  @IsString()
  @IsOptional()
  Observaciones: string;
}
