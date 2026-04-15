import { PartialType } from '@nestjs/mapped-types';
import { CreateActividadEjecutadaDto } from './create-actividad-ejecutada.dto';

export class UpdateActividadEjecutadaDto extends PartialType(CreateActividadEjecutadaDto) {}
