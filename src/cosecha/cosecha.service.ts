import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

import { CreateCosechaDto } from './dto/create-cosecha.dto';
import { UpdateCosechaDto } from './dto/update-cosecha.dto';

import { Cosecha } from './entities/cosecha.entity';

import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CosechaService {
  private readonly logger = new Logger(CosechaService.name);

  constructor(
    @InjectRepository(Cosecha)
    private readonly cosechaRepository: Repository<Cosecha>,
  ) {}

  async create(createCosechaDto: CreateCosechaDto): Promise<Cosecha> {
    try {
      const cosecha = this.cosechaRepository.create(createCosechaDto);

      return await this.cosechaRepository.save(cosecha);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll(): Promise<Cosecha[]> {
    return await this.cosechaRepository.find();
  }

  async findOne(id: number): Promise<Cosecha> {
    const cosecha = await this.cosechaRepository.findOneBy({ id });

    if (!cosecha) {
      throw new NotFoundException(`Cosecha con id ${id} no encontrada`);
    }

    return cosecha;
  }

  async update(
    id: number,
    updateCosechaDto: UpdateCosechaDto,
  ): Promise<Cosecha> {
    const cosecha = await this.cosechaRepository.preload({
      id,
      ...updateCosechaDto,
    });

    if (!cosecha) {
      throw new NotFoundException(`Cosecha con id ${id} no encontrada`);
    }

    try {
      await this.cosechaRepository.save(cosecha);

      return cosecha;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: number) {
    const cosecha = await this.findOne(id);

    await this.cosechaRepository.remove(cosecha);

    return {
      message: 'Cosecha eliminada correctamente',
    };
  }

  private handleDBExceptions(error: any): never {
    this.logger.error(error);

    throw new InternalServerErrorException('Error interno del servidor');
  }
}
