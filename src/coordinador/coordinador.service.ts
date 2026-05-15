import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Logger,
} from '@nestjs/common';

import { CreateCoordinadorDto } from './dto/create-coordinador.dto';
import { UpdateCoordinadorDto } from './dto/update-coordinador.dto';

import { Coordinador } from './entities/coordinador.entity';

import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CoordinadorService {
  private readonly logger = new Logger(CoordinadorService.name);

  constructor(
    @InjectRepository(Coordinador)
    private readonly coordinadorRepository: Repository<Coordinador>,
  ) {}

  async create(
    createCoordinadorDto: CreateCoordinadorDto,
  ): Promise<Coordinador> {
    try {
      const coordinador =
        this.coordinadorRepository.create(createCoordinadorDto);

      return await this.coordinadorRepository.save(coordinador);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll(): Promise<Coordinador[]> {
    return await this.coordinadorRepository.find();
  }

  async findOne(id: number): Promise<Coordinador> {
    const coordinador = await this.coordinadorRepository.findOneBy({ id });

    if (!coordinador) {
      throw new NotFoundException(`Coordinador con id ${id} no encontrado`);
    }

    return coordinador;
  }

  async update(
    id: number,
    updateCoordinadorDto: UpdateCoordinadorDto,
  ): Promise<Coordinador> {
    const coordinador = await this.coordinadorRepository.preload({
      id,
      ...updateCoordinadorDto,
    });

    if (!coordinador) {
      throw new NotFoundException(`Coordinador con id ${id} no encontrado`);
    }

    try {
      await this.coordinadorRepository.save(coordinador);

      return coordinador;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: number) {
    const coordinador = await this.findOne(id);

    await this.coordinadorRepository.remove(coordinador);

    return {
      message: `Coordinador con id ${id} eliminado correctamente`,
    };
  }

  private handleDBExceptions(error: any): never {
    this.logger.error(error);

    throw new InternalServerErrorException('Error interno del servidor');
  }
}
