import { IsDateString, IsNotEmpty, IsString } from "class-validator";

export class CreateAprendizDto {
    @IsString()
@IsNotEmpty()
  tipo: string;

@IsDateString()
@IsNotEmpty()
  fecha: string;

  @IsString()
  @IsNotEmpty()
  formato: string;
}

