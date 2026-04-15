import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AccionCorrectivaService } from './accion-correctiva.service';
import { CreateAccionCorrectivaDto } from './dto/create-accion-correctiva.dto';
import { UpdateAccionCorrectivaDto } from './dto/update-accion-correctiva.dto';

@Controller('accion-correctiva')
export class AccionCorrectivaController {
  constructor(private readonly accionCorrectivaService: AccionCorrectivaService) {}

  @Post()
  create(@Body() createAccionCorrectivaDto: CreateAccionCorrectivaDto) {
    return this.accionCorrectivaService.create(createAccionCorrectivaDto);
  }

  @Get()
  findAll() {
    return this.accionCorrectivaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accionCorrectivaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccionCorrectivaDto: UpdateAccionCorrectivaDto) {
    return this.accionCorrectivaService.update(+id, updateAccionCorrectivaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accionCorrectivaService.remove(+id);
  }
}
