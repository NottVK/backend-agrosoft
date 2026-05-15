import { IsNotEmpty, IsString } from "class-validator";



export class CreatePlanDeManejoDto {
    @IsString()
    @IsNotEmpty()
    actividad_sugerida: string;


    @IsString()
    @IsNotEmpty()
    orden: string;

    @IsString()
    @IsNotEmpty()
    tiempo_sugerido: string;


    @IsString()
    @IsNotEmpty()
    cantidad_sugerida: string;

    @IsString()
    @IsNotEmpty()
    unidad_medida: string;
}

