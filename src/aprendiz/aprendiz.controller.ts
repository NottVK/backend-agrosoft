import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AprendizService } from './aprendiz.service';
import { CreateAprendizDto } from './dto/create-aprendiz.dto';
import { UpdateAprendizDto } from './dto/update-aprendiz.dto';

@Controller('aprendiz')
export class AprendizController {
  constructor(private readonly aprendizService: AprendizService) {}

  @Post()
  create(@Body() createAprendizDto: CreateAprendizDto) {
    return this.aprendizService.create(createAprendizDto);
  }

  @Get()
  findAll() {
    return this.aprendizService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aprendizService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAprendizDto: UpdateAprendizDto,
  ) {
    return this.aprendizService.update(id, updateAprendizDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aprendizService.remove(id);
  }
}
