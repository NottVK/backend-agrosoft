import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CultivoRealService } from './cultivo_real.service';
import { CreateCultivoRealDto } from './dto/create-cultivo_real.dto';
import { UpdateCultivoRealDto } from './dto/update-cultivo_real.dto';

@Controller('cultivo-real')
export class CultivoRealController {
  constructor(private readonly cultivoRealService: CultivoRealService) {}

  @Post()
  create(@Body() createCultivoRealDto: CreateCultivoRealDto) {
    return this.cultivoRealService.create(createCultivoRealDto);
  }

  @Get()
  findAll() {
    return this.cultivoRealService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cultivoRealService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCultivoRealDto: UpdateCultivoRealDto,
  ) {
    return this.cultivoRealService.update(+id, updateCultivoRealDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cultivoRealService.remove(+id);
  }
}
