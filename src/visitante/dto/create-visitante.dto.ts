import { Type } from "class-transformer";
import { IsNumber } from "class-validator";

export class CreateVisitanteDto {
    @Type(() => Number)
    @IsNumber()
    id_rol: number;

    @Type(() => Number)
    @IsNumber()
    id_usuario: number;
}
