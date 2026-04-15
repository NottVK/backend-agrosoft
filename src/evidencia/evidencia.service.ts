import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEvidenciaDto } from './dto/create-evidencia.dto';
import { UpdateEvidenciaDto } from './dto/update-evidencia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Evidencia } from './entities/evidencia.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EvidenciaService {

  constructor(
    @InjectRepository(Evidencia)
    private readonly evidenciaRepository: Repository<Evidencia>,
  ) {}

  async create(createEvidenciaDto: CreateEvidenciaDto) {
    const evidencia = this.evidenciaRepository.create(createEvidenciaDto);
    return await this.evidenciaRepository.save(evidencia);
  }

  async findAll() {
    return await this.evidenciaRepository.find();
  }

  async findOne(id: number) {
    const evidencia = await this.evidenciaRepository.findOneBy({ id });

    if (!evidencia) {
      throw new NotFoundException(`Evidencia con id ${id} no encontrada`);
    }

    return evidencia;
  }

  async update(id: number, updateEvidenciaDto: UpdateEvidenciaDto) {
    await this.findOne(id);
    await this.evidenciaRepository.update(id, updateEvidenciaDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.evidenciaRepository.delete(id);
    return { message: 'Evidencia eliminada correctamente' };
  }
}