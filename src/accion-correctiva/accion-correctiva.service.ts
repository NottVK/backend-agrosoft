import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';

import { CreateAccionCorrectivaDto } from './dto/create-accion-correctiva.dto';
import { UpdateAccionCorrectivaDto } from './dto/update-accion-correctiva.dto';

import { InjectRepository } from '@nestjs/typeorm';

import { AccionCorrectiva } from './entities/accion-correctiva.entity';

import { Repository } from 'typeorm';

@Injectable()
export class AccionCorrectivaService {
  constructor(
    @InjectRepository(AccionCorrectiva)
    private readonly accionCorrectivaRepository: Repository<AccionCorrectiva>,
  ) {}

  async create(createAccionCorrectivaDto: CreateAccionCorrectivaDto) {
    try {
      const accionCorrectiva = this.accionCorrectivaRepository.create(
        createAccionCorrectivaDto,
      );

      return await this.accionCorrectivaRepository.save(accionCorrectiva);
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException(
        'Error al crear la acción correctiva',
      );
    }
  }

  async findAll() {
    return await this.accionCorrectivaRepository.find();
  }

  async findOne(id: number) {
    const accionCorrectiva = await this.accionCorrectivaRepository.findOneBy({
      id,
    });

    if (!accionCorrectiva) {
      throw new NotFoundException(
        `AccionCorrectiva con id ${id} no encontrada`,
      );
    }

    return accionCorrectiva;
  }

  async update(
    id: number,
    updateAccionCorrectivaDto: UpdateAccionCorrectivaDto,
  ) {
    const accionCorrectiva = await this.accionCorrectivaRepository.preload({
      id,
      ...updateAccionCorrectivaDto,
    });

    if (!accionCorrectiva) {
      throw new NotFoundException(
        `AccionCorrectiva con id ${id} no encontrada`,
      );
    }

    try {
      await this.accionCorrectivaRepository.save(accionCorrectiva);

      return accionCorrectiva;
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException(
        'Error al actualizar la acción correctiva',
      );
    }
  }

  async remove(id: number) {
    const accionCorrectiva = await this.findOne(id);

    await this.accionCorrectivaRepository.remove(accionCorrectiva);

    return {
      message: 'AccionCorrectiva eliminada correctamente',
    };
  }
}
