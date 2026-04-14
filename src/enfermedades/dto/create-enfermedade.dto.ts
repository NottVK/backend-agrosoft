import { IsString, IsNumber, } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateEnfermedadeDto {
    @IsString()
    nombre_enfermedad: string | undefined;

    @IsString()
    grado_daño: string | undefined;
}