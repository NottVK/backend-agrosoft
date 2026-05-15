import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

import { CreateEvidenciaDto } from './dto/create-evidencia.dto';
import { UpdateEvidenciaDto } from './dto/update-evidencia.dto';

import { InjectRepository } from '@nestjs/typeorm';

import { Evidencia } from './entities/evidencia.entity';

import { Repository } from 'typeorm';

@Injectable()
export class EvidenciaService {
  private readonly logger = new Logger(EvidenciaService.name);

  constructor(
    @InjectRepository(Evidencia)
    private readonly evidenciaRepository: Repository<Evidencia>,
  ) {}

  async create(createEvidenciaDto: CreateEvidenciaDto): Promise<Evidencia> {
    try {
      const evidencia = this.evidenciaRepository.create(createEvidenciaDto);

      return await this.evidenciaRepository.save(evidencia);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll(): Promise<Evidencia[]> {
    return await this.evidenciaRepository.find();
  }

  async findOne(id: number): Promise<Evidencia> {
    const evidencia = await this.evidenciaRepository.findOneBy({
      id,
    });

    if (!evidencia) {
      throw new NotFoundException(`Evidencia con id ${id} no encontrada`);
    }

    return evidencia;
  }

  async update(
    id: number,
    updateEvidenciaDto: UpdateEvidenciaDto,
  ): Promise<Evidencia> {
    const evidencia = await this.evidenciaRepository.preload({
      id,
      ...updateEvidenciaDto,
    });

    if (!evidencia) {
      throw new NotFoundException(`Evidencia con id ${id} no encontrada`);
    }

    try {
      await this.evidenciaRepository.save(evidencia);

      return evidencia;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: number) {
    const evidencia = await this.findOne(id);

    await this.evidenciaRepository.remove(evidencia);

    return {
      message: 'Evidencia eliminada correctamente',
    };
  }

  private handleDBExceptions(error: any): never {
    this.logger.error(error);

    throw new InternalServerErrorException('Error interno del servidor');
  }
}
