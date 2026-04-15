import { PartialType } from '@nestjs/mapped-types';
import { CreateAccionCorrectivaDto } from './create-accion-correctiva.dto';

export class UpdateAccionCorrectivaDto extends PartialType(CreateAccionCorrectivaDto) {}
