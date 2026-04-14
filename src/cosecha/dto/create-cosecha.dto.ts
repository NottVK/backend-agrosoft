import { IsDateString, IsNumber, IsString, Min, IsOptional, Length, } from "class-validator";
export class CreateCosechaDto {
    
    @IsDateString()
    Fecha_Cosecha: string;

    @IsNumber()
    @Min(0)
    Cantidad: number;

    @IsString()
    @Length(1,50)
    Unida_Medida: string;


    @IsString()
    @Length(1,100)
    Tipo_Cosecha: string;

    @IsOptional()
    @IsString()
    Observaciones?: string;






}
