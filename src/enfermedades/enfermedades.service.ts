import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';

import { CreateEnfermedadeDto } from './dto/create-enfermedade.dto';
import { UpdateEnfermedadeDto } from './dto/update-enfermedade.dto';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Enfermedade } from './entities/enfermedade.entity';

@Injectable()
export class EnfermedadesService {
  constructor(
    @InjectRepository(Enfermedade)
    private readonly enfermedadeRepository: Repository<Enfermedade>,
  ) {}

  async create(createEnfermedadeDto: CreateEnfermedadeDto) {
    try {
      const enfermedade =
        this.enfermedadeRepository.create(createEnfermedadeDto);

      return await this.enfermedadeRepository.save(enfermedade);
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException('Error al crear la enfermedad');
    }
  }

  async findAll() {
    return await this.enfermedadeRepository.find();
  }

  async findOne(id: string) {
    const enfermedade = await this.enfermedadeRepository.findOneBy({
      id_enfermedad: id,
    });

    if (!enfermedade) {
      throw new NotFoundException(`Enfermedad con id ${id} no encontrada`);
    }

    return enfermedade;
  }

  async update(id: string, updateEnfermedadeDto: UpdateEnfermedadeDto) {
    const enfermedade = await this.enfermedadeRepository.preload({
      id_enfermedad: id,
      ...updateEnfermedadeDto,
    });

    if (!enfermedade) {
      throw new NotFoundException(`Enfermedad con id ${id} no encontrada`);
    }

    try {
      await this.enfermedadeRepository.save(enfermedade);

      return enfermedade;
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException(
        'Error al actualizar la enfermedad',
      );
    }
  }

  async remove(id: string) {
    const enfermedade = await this.findOne(id);

    await this.enfermedadeRepository.remove(enfermedade);

    return {
      message: 'Enfermedad eliminada correctamente',
    };
  }
}
