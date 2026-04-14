import { IsString } from "class-validator";

export class CreateRolDto {
    @IsString()
    nombre_rol: string | undefined;

    @IsString()
    descripcion: string | undefined;

    @IsString()
    estado: string | undefined;
}
