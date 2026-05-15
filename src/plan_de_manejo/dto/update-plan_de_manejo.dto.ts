import { PartialType } from '@nestjs/mapped-types';
import { CreatePlanDeManejoDto } from './create-plan_de_manejo.dto';

export class UpdatePlanDeManejoDto extends PartialType(CreatePlanDeManejoDto) {}
