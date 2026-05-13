import { IsNotEmpty, IsSemVer, IsString, maxLength } from "class-validator"


export class CreateCultivoBaseDto {
    @IsString()
    @IsNotEmpty()
    plan_manejo: string ;


    @IsString()
    @IsNotEmpty()
    nombre_cultivo: string;

    @IsString()
    @IsNotEmpty()
    descripcion:string;


    @IsString()
    @IsNotEmpty()
    estado_cultivo:string;
}
