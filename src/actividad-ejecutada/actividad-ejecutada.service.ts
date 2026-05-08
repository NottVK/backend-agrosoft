import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';

import { CreateActividadEjecutadaDto } from './dto/create-actividad-ejecutada.dto';
import { UpdateActividadEjecutadaDto } from './dto/update-actividad-ejecutada.dto';

import { InjectRepository } from '@nestjs/typeorm';

import { ActividadEjecutada } from './entities/actividad-ejecutada.entity';

import { Repository } from 'typeorm';

@Injectable()
export class ActividadEjecutadaService {
  constructor(
    @InjectRepository(ActividadEjecutada)
    private readonly actividadEjecutadaRepository: Repository<ActividadEjecutada>,
  ) {}

  async create(createActividadEjecutadaDto: CreateActividadEjecutadaDto) {
    try {
      const actividadEjecutada = this.actividadEjecutadaRepository.create(
        createActividadEjecutadaDto,
      );

      return await this.actividadEjecutadaRepository.save(actividadEjecutada);
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException(
        'Error al crear la actividad ejecutada',
      );
    }
  }

  async findAll() {
    return await this.actividadEjecutadaRepository.find();
  }

  async findOne(id: number) {
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
  ) {
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
      console.log(error);

      throw new InternalServerErrorException(
        'Error al actualizar la actividad ejecutada',
      );
    }
  }

  async remove(id: number) {
    const actividadEjecutada = await this.findOne(id);

    await this.actividadEjecutadaRepository.remove(actividadEjecutada);

    return {
      message: 'ActividadEjecutada eliminada correctamente',
    };
  }
}
