import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';

import { CreateIncidenciaDto } from './dto/create-incidencia.dto';
import { UpdateIncidenciaDto } from './dto/update-incidencia.dto';

import { InjectRepository } from '@nestjs/typeorm';

import { Incidencia } from './entities/incidencia.entity';

import { Repository } from 'typeorm';

@Injectable()
export class IncidenciaService {
  constructor(
    @InjectRepository(Incidencia)
    private readonly incidenciaRepository: Repository<Incidencia>,
  ) {}

  async create(createIncidenciaDto: CreateIncidenciaDto) {
    try {
      const incidencia = this.incidenciaRepository.create(createIncidenciaDto);

      return await this.incidenciaRepository.save(incidencia);
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException('Error al crear la incidencia');
    }
  }

  async findAll() {
    return await this.incidenciaRepository.find();
  }

  async findOne(id: number) {
    const incidencia = await this.incidenciaRepository.findOneBy({
      id_incidencia: id,
    });

    if (!incidencia) {
      throw new NotFoundException(`Incidencia con id ${id} no encontrada`);
    }

    return incidencia;
  }

  async update(id: number, updateIncidenciaDto: UpdateIncidenciaDto) {
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
      console.log(error);

      throw new InternalServerErrorException(
        'Error al actualizar la incidencia',
      );
    }
  }

  async remove(id: number) {
    const incidencia = await this.findOne(id);

    await this.incidenciaRepository.remove(incidencia);

    return {
      message: 'Incidencia eliminada correctamente',
    };
  }
}
