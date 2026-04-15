import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ActividadEjecutadaService } from './actividad-ejecutada.service';
import { CreateActividadEjecutadaDto } from './dto/create-actividad-ejecutada.dto';
import { UpdateActividadEjecutadaDto } from './dto/update-actividad-ejecutada.dto';

@Controller('actividad-ejecutada')
export class ActividadEjecutadaController {
  constructor(
    private readonly actividadEjecutadaService: ActividadEjecutadaService,
  ) {}

  @Post()
  create(@Body() createActividadEjecutadaDto: CreateActividadEjecutadaDto) {
    return this.actividadEjecutadaService.create(createActividadEjecutadaDto);
  }

  @Get()
  findAll() {
    return this.actividadEjecutadaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.actividadEjecutadaService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateActividadEjecutadaDto: UpdateActividadEjecutadaDto,
  ) {
    return this.actividadEjecutadaService.update(
      +id,
      updateActividadEjecutadaDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.actividadEjecutadaService.remove(+id);
  }
}
