import {  IsDateString, IsNotEmpty,  IsString,  } from "class-validator"

export class CreateReporteDto {
        @IsString()
        @IsNotEmpty()
        tipo:string
        
        @IsDateString()
        @IsNotEmpty()
        fechai:string

        @IsNotEmpty()
        formato:string
}
