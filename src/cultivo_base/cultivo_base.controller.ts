import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { CultivoBaseService } from './cultivo_base.service';

import { CreateCultivoBaseDto } from './dto/create-cultivo_base.dto';
import { UpdateCultivoBaseDto } from './dto/update-cultivo_base.dto';

@Controller('cultivo-base')
export class CultivoBaseController {
  constructor(private readonly cultivoBaseService: CultivoBaseService) {}

  @Post()
  create(@Body() createCultivoBaseDto: CreateCultivoBaseDto) {
    return this.cultivoBaseService.create(createCultivoBaseDto);
  }

  @Get()
  findAll() {
    return this.cultivoBaseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cultivoBaseService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCultivoBaseDto: UpdateCultivoBaseDto,
  ) {
    return this.cultivoBaseService.update(id, updateCultivoBaseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cultivoBaseService.remove(id);
  }
}
