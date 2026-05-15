import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

import { CreateEnfermedadeDto } from './dto/create-enfermedade.dto';
import { UpdateEnfermedadeDto } from './dto/update-enfermedade.dto';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Enfermedade } from './entities/enfermedade.entity';

@Injectable()
export class EnfermedadesService {
  private readonly logger = new Logger(EnfermedadesService.name);

  constructor(
    @InjectRepository(Enfermedade)
    private readonly enfermedadeRepository: Repository<Enfermedade>,
  ) {}

  async create(
    createEnfermedadeDto: CreateEnfermedadeDto,
  ): Promise<Enfermedade> {
    try {
      const enfermedade =
        this.enfermedadeRepository.create(createEnfermedadeDto);

      return await this.enfermedadeRepository.save(enfermedade);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll(): Promise<Enfermedade[]> {
    return await this.enfermedadeRepository.find();
  }

  async findOne(id: string): Promise<Enfermedade> {
    const enfermedade = await this.enfermedadeRepository.findOneBy({
      id_enfermedad: id,
    });

    if (!enfermedade) {
      throw new NotFoundException(`Enfermedad con id ${id} no encontrada`);
    }

    return enfermedade;
  }

  async update(
    id: string,
    updateEnfermedadeDto: UpdateEnfermedadeDto,
  ): Promise<Enfermedade> {
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
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    const enfermedade = await this.findOne(id);

    await this.enfermedadeRepository.remove(enfermedade);

    return {
      message: 'Enfermedad eliminada correctamente',
    };
  }

  private handleDBExceptions(error: any): never {
    this.logger.error(error);

    throw new InternalServerErrorException('Error interno del servidor');
  }
}
