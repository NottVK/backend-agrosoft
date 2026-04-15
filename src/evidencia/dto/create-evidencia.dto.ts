import {
  IsString,
  IsDateString,
  IsOptional,
  Length,
} from 'class-validator';

export class CreateEvidenciaDto {

  @IsString()
  @Length(1, 100)
  tipoEvidencia: string;

  @IsString()
  archivoUrl: string;

  @IsString()
  descripcion: string;

  @IsDateString()
  fechaRegistro: string;

  @IsOptional()
  @IsString()
  observaciones?: string;

  @IsOptional()
  @IsString()
  resultadoPreliminar?: string;

}