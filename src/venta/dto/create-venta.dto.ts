import { IsInt, IsNotEmpty, IsPositive, IsString } from "class-validator"

export class CreateVentaDto {
    
        @IsString()
        @IsNotEmpty()
        fechav: string
    
        @IsInt()
        @IsPositive()
        cantidad:number
    
        @IsString()
        @IsNotEmpty()
        presiou:string
    
        @IsString()
        @IsNotEmpty()
        ingresot:string
    
        @IsString()
        @IsNotEmpty()
        forpago: string

        @IsString()
        @IsNotEmpty()
        estadop: string

}
