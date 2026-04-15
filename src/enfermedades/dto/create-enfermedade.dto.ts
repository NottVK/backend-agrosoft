import { IsString, IsNumber, } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateEnfermedadeDto {
    @IsString()
    nombre_enfermedad: string;

    @IsString()
    grado_daño: string;
}