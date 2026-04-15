import {
  IsString,
  IsEmail,
  MinLength,
  IsBoolean,
  IsOptional,
  Length,
} from 'class-validator';
export class CreateUsuarioDto {
    @IsString()
    @Length(1, 100)
    nombre: string;

    @IsEmail()
    correo: string;

    @IsString()
    @MinLength(6)
    contraseña: string;

    @IsBoolean()
    @IsOptional()
    Estado?: boolean;

    @IsString()
    @Length(7, 20)
    @IsOptional()
    telefono?: string;
}
