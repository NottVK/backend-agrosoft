import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Logger,
} from '@nestjs/common';

import { CreateVisitanteDto } from './dto/create-visitante.dto';
import { UpdateVisitanteDto } from './dto/update-visitante.dto';

import { InjectRepository } from '@nestjs/typeorm';

import { Visitante } from './entities/visitante.entity';

import { Repository } from 'typeorm';

@Injectable()
export class VisitanteService {
  private readonly logger = new Logger(VisitanteService.name);

  constructor(
    @InjectRepository(Visitante)
    private readonly visitanteRepository: Repository<Visitante>,
  ) {}

  async create(createVisitanteDto: CreateVisitanteDto): Promise<Visitante> {
    try {
      const visitante = this.visitanteRepository.create(createVisitanteDto);

      return await this.visitanteRepository.save(visitante);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll(): Promise<Visitante[]> {
    return await this.visitanteRepository.find();
  }

  async findOne(id: number): Promise<Visitante> {
    const visitante = await this.visitanteRepository.findOneBy({
      id,
    });

    if (!visitante) {
      throw new NotFoundException(`Visitante con id ${id} no encontrado`);
    }

    return visitante;
  }

  async update(
    id: number,
    updateVisitanteDto: UpdateVisitanteDto,
  ): Promise<Visitante> {
    const visitante = await this.visitanteRepository.preload({
      id,
      ...updateVisitanteDto,
    });

    if (!visitante) {
      throw new NotFoundException(`Visitante con id ${id} no encontrado`);
    }

    try {
      await this.visitanteRepository.save(visitante);

      return visitante;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: number) {
    const visitante = await this.findOne(id);

    await this.visitanteRepository.remove(visitante);

    return {
      message: `Visitante con id ${id} eliminado correctamente`,
    };
  }

  private handleDBExceptions(error: any): never {
    this.logger.error(error);

    throw new InternalServerErrorException('Error interno del servidor');
  }
}
