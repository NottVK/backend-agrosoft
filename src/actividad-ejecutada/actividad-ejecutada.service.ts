import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateActividadEjecutadaDto } from './dto/create-actividad-ejecutada.dto';
import { UpdateActividadEjecutadaDto } from './dto/update-actividad-ejecutada.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ActividadEjecutada } from './entities/actividad-ejecutada.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ActividadEjecutadaService {
  constructor(
    @InjectRepository(ActividadEjecutada)
    private actividadEjecutadaRepository: Repository<ActividadEjecutada>,
  ) {}

  async create(createActividadEjecutadaDto: CreateActividadEjecutadaDto) {
    const actividadEjecutada = this.actividadEjecutadaRepository.create(
      createActividadEjecutadaDto,
    );
    return await this.actividadEjecutadaRepository.save(actividadEjecutada);
  }

  async findAll() {
    return await this.actividadEjecutadaRepository.find();
  }

  async findOne(id: number) {
    const actividadEjecutada =
      await this.actividadEjecutadaRepository.findOneBy({ id });

    if (!actividadEjecutada) {
      throw new NotFoundException(
        `ActividadEjecutada con id ${id} no encontrado`,
      );
    }
    return actividadEjecutada;
  }

  async update(
    id: number,
    updateActividadEjecutadaDto: UpdateActividadEjecutadaDto,
  ) {
    await this.findOne(id);

    await this.actividadEjecutadaRepository.update(
      id,
      updateActividadEjecutadaDto,
    );
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.actividadEjecutadaRepository.delete(id);
    return { message: `ActividadEjecutada eliminado correctamente` };
  }
}
