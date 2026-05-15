import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateAprendizDto {

  @IsString()
  @IsNotEmpty()
  id_insumo: string;

  @IsString()
  @IsNotEmpty()
  actividad_sugerida: string;

  @IsNumber()
  orden: number;

  @IsString()
  @IsNotEmpty()
  tipo_tratamiento: string;

  @IsDateString()
  fecha_aplicacion_tratamiento: string;

  @IsString()
  descripcion: string;

  @IsNumber()
  cantidad_sugerida: number;
}
