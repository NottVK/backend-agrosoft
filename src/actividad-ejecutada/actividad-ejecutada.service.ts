import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

import { CreateActividadEjecutadaDto } from './dto/create-actividad-ejecutada.dto';
import { UpdateActividadEjecutadaDto } from './dto/update-actividad-ejecutada.dto';

import { InjectRepository } from '@nestjs/typeorm';

import { ActividadEjecutada } from './entities/actividad-ejecutada.entity';

import { Repository } from 'typeorm';

@Injectable()
export class ActividadEjecutadaService {
  private readonly logger = new Logger(ActividadEjecutadaService.name);

  constructor(
    @InjectRepository(ActividadEjecutada)
    private readonly actividadEjecutadaRepository: Repository<ActividadEjecutada>,
  ) {}

  async create(
    createActividadEjecutadaDto: CreateActividadEjecutadaDto,
  ): Promise<ActividadEjecutada> {
    try {
      const actividadEjecutada = this.actividadEjecutadaRepository.create(
        createActividadEjecutadaDto,
      );

      return await this.actividadEjecutadaRepository.save(actividadEjecutada);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll(): Promise<ActividadEjecutada[]> {
    return await this.actividadEjecutadaRepository.find();
  }

  async findOne(id: number): Promise<ActividadEjecutada> {
    const actividadEjecutada =
      await this.actividadEjecutadaRepository.findOneBy({
        id,
      });

    if (!actividadEjecutada) {
      throw new NotFoundException(
        `ActividadEjecutada con id ${id} no encontrada`,
      );
    }

    return actividadEjecutada;
  }

  async update(
    id: number,
    updateActividadEjecutadaDto: UpdateActividadEjecutadaDto,
  ): Promise<ActividadEjecutada> {
    const actividadEjecutada = await this.actividadEjecutadaRepository.preload({
      id,
      ...updateActividadEjecutadaDto,
    });

    if (!actividadEjecutada) {
      throw new NotFoundException(
        `ActividadEjecutada con id ${id} no encontrada`,
      );
    }

    try {
      await this.actividadEjecutadaRepository.save(actividadEjecutada);

      return actividadEjecutada;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: number) {
    const actividadEjecutada = await this.findOne(id);

    await this.actividadEjecutadaRepository.remove(actividadEjecutada);

    return {
      message: 'ActividadEjecutada eliminada correctamente',
    };
  }

  private handleDBExceptions(error: any): never {
    this.logger.error(error);

    throw new InternalServerErrorException('Error interno del servidor');
  }
}
