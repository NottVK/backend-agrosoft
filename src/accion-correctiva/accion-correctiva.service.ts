import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

import { CreateAccionCorrectivaDto } from './dto/create-accion-correctiva.dto';
import { UpdateAccionCorrectivaDto } from './dto/update-accion-correctiva.dto';

import { InjectRepository } from '@nestjs/typeorm';

import { AccionCorrectiva } from './entities/accion-correctiva.entity';

import { Repository } from 'typeorm';

@Injectable()
export class AccionCorrectivaService {
  private readonly logger = new Logger(AccionCorrectivaService.name);

  constructor(
    @InjectRepository(AccionCorrectiva)
    private readonly accionCorrectivaRepository: Repository<AccionCorrectiva>,
  ) {}

  async create(
    createAccionCorrectivaDto: CreateAccionCorrectivaDto,
  ): Promise<AccionCorrectiva> {
    try {
      const accionCorrectiva = this.accionCorrectivaRepository.create(
        createAccionCorrectivaDto,
      );

      return await this.accionCorrectivaRepository.save(accionCorrectiva);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll(): Promise<AccionCorrectiva[]> {
    return await this.accionCorrectivaRepository.find();
  }

  async findOne(id: number): Promise<AccionCorrectiva> {
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
  ): Promise<AccionCorrectiva> {
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
      this.handleDBExceptions(error);
    }
  }

  async remove(id: number) {
    const accionCorrectiva = await this.findOne(id);

    await this.accionCorrectivaRepository.remove(accionCorrectiva);

    return {
      message: 'AccionCorrectiva eliminada correctamente',
    };
  }

  private handleDBExceptions(error: any): never {
    this.logger.error(error);

    throw new InternalServerErrorException('Error interno del servidor');
  }
}
