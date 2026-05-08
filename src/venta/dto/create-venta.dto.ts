import { IsInt, IsNotEmpty, IsPositive, IsString, IsNumber } from "class-validator";
import { Type } from "class-transformer";

export class CreateVentaDto {
    
    @IsString()
    @IsNotEmpty()
    fechav: string;

    @IsInt()
    @IsPositive()
    cantidad: number;

    
    @IsNumber()
    @IsPositive()
    @Type(() => Number) 
    presiou: number;

  
    @IsNumber()
    @IsPositive()
    @Type(() => Number)
    ingresot: number;

    @IsString()
    @IsNotEmpty()
    forpago: string;

    @IsString()
    @IsNotEmpty()
    estadop: string;
}