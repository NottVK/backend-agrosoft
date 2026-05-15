import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

import { CreateTratamientoDto } from './dto/create-tratamiento.dto';
import { UpdateTratamientoDto } from './dto/update-tratamiento.dto';

import { InjectRepository } from '@nestjs/typeorm';

import { Tratamiento } from './entities/tratamiento.entity';

import { Repository } from 'typeorm';

@Injectable()
export class TratamientoService {
  private readonly logger = new Logger(TratamientoService.name);

  constructor(
    @InjectRepository(Tratamiento)
    private readonly tratamientoRepository: Repository<Tratamiento>,
  ) {}

  async create(
    createTratamientoDto: CreateTratamientoDto,
  ): Promise<Tratamiento> {
    try {
      const tratamiento =
        this.tratamientoRepository.create(createTratamientoDto);

      return await this.tratamientoRepository.save(tratamiento);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll(): Promise<Tratamiento[]> {
    return await this.tratamientoRepository.find();
  }

  async findOne(id: number): Promise<Tratamiento> {
    const tratamiento = await this.tratamientoRepository.findOneBy({
      id,
    });

    if (!tratamiento) {
      throw new NotFoundException(`Tratamiento con id ${id} no encontrado`);
    }

    return tratamiento;
  }

  async update(
    id: number,
    updateTratamientoDto: UpdateTratamientoDto,
  ): Promise<Tratamiento> {
    const tratamiento = await this.tratamientoRepository.preload({
      id,
      ...updateTratamientoDto,
    });

    if (!tratamiento) {
      throw new NotFoundException(`Tratamiento con id ${id} no encontrado`);
    }

    try {
      await this.tratamientoRepository.save(tratamiento);

      return tratamiento;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: number) {
    const tratamiento = await this.findOne(id);

    await this.tratamientoRepository.remove(tratamiento);

    return {
      message: 'Tratamiento eliminado correctamente',
    };
  }

  private handleDBExceptions(error: any): never {
    this.logger.error(error);

    throw new InternalServerErrorException('Error interno del servidor');
  }
}
