import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PlanDeManejoService } from './plan_de_manejo.service';
import { CreatePlanDeManejoDto } from './dto/create-plan_de_manejo.dto';
import { UpdatePlanDeManejoDto } from './dto/update-plan_de_manejo.dto';

@Controller('plan-de-manejo')
export class PlanDeManejoController {
  constructor(private readonly planDeManejoService: PlanDeManejoService) {}

  @Post()
  create(@Body() createPlanDeManejoDto: CreatePlanDeManejoDto) {
    return this.planDeManejoService.create(createPlanDeManejoDto);
  }

  @Get()
  findAll() {
    return this.planDeManejoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.planDeManejoService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePlanDeManejoDto: UpdatePlanDeManejoDto,
  ) {
    return this.planDeManejoService.update(id, updatePlanDeManejoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.planDeManejoService.remove(id);
  }
}
