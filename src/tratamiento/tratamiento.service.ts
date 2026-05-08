import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';

import { CreateTratamientoDto } from './dto/create-tratamiento.dto';
import { UpdateTratamientoDto } from './dto/update-tratamiento.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Tratamiento } from './entities/tratamiento.entity';

import { Repository } from 'typeorm';

@Injectable()
export class TratamientoService {
  constructor(
    @InjectRepository(Tratamiento)
    private readonly tratamientoRepository: Repository<Tratamiento>,
  ) {}

  async create(createTratamientoDto: CreateTratamientoDto) {
    try {
      const tratamiento =
        this.tratamientoRepository.create(createTratamientoDto);

      return await this.tratamientoRepository.save(tratamiento);
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException('Error al crear el tratamiento');
    }
  }

  async findAll() {
    return await this.tratamientoRepository.find();
  }

  async findOne(id: number) {
    const tratamiento = await this.tratamientoRepository.findOneBy({ id });

    if (!tratamiento) {
      throw new NotFoundException(`Tratamiento con id ${id} no encontrado`);
    }

    return tratamiento;
  }

  async update(id: number, updateTratamientoDto: UpdateTratamientoDto) {
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
      console.log(error);

      throw new InternalServerErrorException(
        'Error al actualizar el tratamiento',
      );
    }
  }

  async remove(id: number) {
    const tratamiento = await this.findOne(id);

    await this.tratamientoRepository.remove(tratamiento);

    return {
      message: 'Tratamiento eliminado correctamente',
    };
  }
}
