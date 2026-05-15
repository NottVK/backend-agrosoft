import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

import { CreateIncidenciaDto } from './dto/create-incidencia.dto';
import { UpdateIncidenciaDto } from './dto/update-incidencia.dto';

import { InjectRepository } from '@nestjs/typeorm';

import { Incidencia } from './entities/incidencia.entity';

import { Repository } from 'typeorm';

@Injectable()
export class IncidenciaService {
  private readonly logger = new Logger(IncidenciaService.name);

  constructor(
    @InjectRepository(Incidencia)
    private readonly incidenciaRepository: Repository<Incidencia>,
  ) {}

  async create(createIncidenciaDto: CreateIncidenciaDto): Promise<Incidencia> {
    try {
      const incidencia = this.incidenciaRepository.create(createIncidenciaDto);

      return await this.incidenciaRepository.save(incidencia);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll(): Promise<Incidencia[]> {
    return await this.incidenciaRepository.find();
  }

  async findOne(id: number): Promise<Incidencia> {
    const incidencia = await this.incidenciaRepository.findOneBy({
      id_incidencia: id,
    });

    if (!incidencia) {
      throw new NotFoundException(`Incidencia con id ${id} no encontrada`);
    }

    return incidencia;
  }

  async update(
    id: number,
    updateIncidenciaDto: UpdateIncidenciaDto,
  ): Promise<Incidencia> {
    const incidencia = await this.incidenciaRepository.preload({
      id_incidencia: id,
      ...updateIncidenciaDto,
    });

    if (!incidencia) {
      throw new NotFoundException(`Incidencia con id ${id} no encontrada`);
    }

    try {
      await this.incidenciaRepository.save(incidencia);

      return incidencia;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: number) {
    const incidencia = await this.findOne(id);

    await this.incidenciaRepository.remove(incidencia);

    return {
      message: 'Incidencia eliminada correctamente',
    };
  }

  private handleDBExceptions(error: any): never {
    this.logger.error(error);

    throw new InternalServerErrorException('Error interno del servidor');
  }
}
