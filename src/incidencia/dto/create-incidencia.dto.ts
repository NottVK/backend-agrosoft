import { IsString, IsInt, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateIncidenciaDto {

    @IsString()
    @IsNotEmpty()
    tipo_incidencia!: string;

    @IsString()
    @IsNotEmpty()
    gravedad!: string;

    @IsString()
    @IsNotEmpty()
    descripcion!: string;

    @IsInt()
    @IsNotEmpty()
    id_plagas!: number;

    @IsInt()
    @IsOptional()
    id_enfermedades?: number;

    @IsInt()
    @IsNotEmpty()
    id_usuario!: number;

    @IsInt()
    @IsNotEmpty()
    id_cultivo_real!: number;
}
