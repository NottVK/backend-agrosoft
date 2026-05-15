import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Logger,
} from '@nestjs/common';

import { CreateReporteDto } from './dto/create-reporte.dto';
import { UpdateReporteDto } from './dto/update-reporte.dto';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Reporte } from './entities/reporte.entity';

@Injectable()
export class ReporteService {
  private readonly logger = new Logger(ReporteService.name);

  constructor(
    @InjectRepository(Reporte)
    private readonly reporteRepository: Repository<Reporte>,
  ) {}

  async create(createReporteDto: CreateReporteDto): Promise<Reporte> {
    try {
      const reporte = this.reporteRepository.create(createReporteDto);

      return await this.reporteRepository.save(reporte);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll(): Promise<Reporte[]> {
    return await this.reporteRepository.find();
  }

  async findOne(id: string): Promise<Reporte> {
    const reporte = await this.reporteRepository.findOneBy({
      id,
    });

    if (!reporte) {
      throw new NotFoundException(`Reporte con id ${id} no existe`);
    }

    return reporte;
  }

  async update(
    id: string,
    updateReporteDto: UpdateReporteDto,
  ): Promise<Reporte> {
    const reporte = await this.reporteRepository.preload({
      id,
      ...updateReporteDto,
    });

    if (!reporte) {
      throw new NotFoundException(`Reporte con id ${id} no existe`);
    }

    try {
      await this.reporteRepository.save(reporte);

      return reporte;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    const reporte = await this.findOne(id);

    await this.reporteRepository.remove(reporte);

    return {
      message: 'Reporte eliminado correctamente',
    };
  }

  private handleDBExceptions(error: any): never {
    this.logger.error(error);

    throw new InternalServerErrorException('Error interno del servidor');
  }
}
