import { from } from "rxjs";
import { IsString, IsInt, IsOptional, MinLength } from 'class-validator'

export class CreatePlagasDto {
    
    @IsString()
    @MinLength(3)
    nombre_plaga!: string; 

    @IsString()
    grado_daño!: string; 

    @IsInt()
    @IsOptional()
    id_plan_manejo!: number;
}
