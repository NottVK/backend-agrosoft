import { Controller, Get, Post, Body } from '@nestjs/common';
import { EvidenciaService } from './evidencia.service';

@Controller('evidencia')
export class EvidenciaController {
  constructor(private readonly evidenciaService: EvidenciaService) {}

  @Post()
  create(@Body() body: any) {
    return this.evidenciaService.create(body);
  }

  @Get()
  findAll() {
    return this.evidenciaService.findAll();
  }
}