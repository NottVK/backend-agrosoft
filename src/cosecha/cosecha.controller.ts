import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CosechaService } from './cosecha.service';
import { CreateCosechaDto } from './dto/create-cosecha.dto';
import { UpdateCosechaDto } from './dto/update-cosecha.dto';

@Controller('cosecha')
export class CosechaController {
  constructor(private readonly cosechaService: CosechaService) {}

  @Post()
  create(@Body() createCosechaDto: CreateCosechaDto) {
    return this.cosechaService.create(createCosechaDto);
  }

  @Get()
  findAll() {
    return this.cosechaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cosechaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCosechaDto: UpdateCosechaDto) {
    return this.cosechaService.update(+id, updateCosechaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cosechaService.remove(+id);
  }
}
