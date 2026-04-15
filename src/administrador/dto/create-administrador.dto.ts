import { IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAdministradorDto {

  @Type(() => Number)
  @IsNumber()
  id_rol: number;

  @Type(() => Number)
  @IsNumber()
  id_usuario: number;

}