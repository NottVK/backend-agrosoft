import { IsString } from "class-validator";

export class CreateInstructorDto {
    @IsString()
    especialidad: string | undefined;
}
