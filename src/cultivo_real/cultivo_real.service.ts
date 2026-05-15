import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

import { CreateCultivoRealDto } from './dto/create-cultivo_real.dto';
import { UpdateCultivoRealDto } from './dto/update-cultivo_real.dto';

import { CultivoReal } from './entities/cultivo_real.entity';

import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CultivoRealService {
  private readonly logger = new Logger(CultivoRealService.name);

  constructor(
    @InjectRepository(CultivoReal)
    private readonly cultivoRealRepository: Repository<CultivoReal>,
  ) {}

  async create(
    createCultivoRealDto: CreateCultivoRealDto,
  ): Promise<CultivoReal> {
    try {
      const cultivoReal =
        this.cultivoRealRepository.create(createCultivoRealDto);

      return await this.cultivoRealRepository.save(cultivoReal);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll(): Promise<CultivoReal[]> {
    return await this.cultivoRealRepository.find();
  }

  async findOne(id: number): Promise<CultivoReal> {
    const cultivoReal = await this.cultivoRealRepository.findOneBy({
      id,
    });

    if (!cultivoReal) {
      throw new NotFoundException(`CultivoReal con id ${id} no encontrado`);
    }

    return cultivoReal;
  }

  async update(
    id: number,
    updateCultivoRealDto: UpdateCultivoRealDto,
  ): Promise<CultivoReal> {
    const cultivoReal = await this.cultivoRealRepository.preload({
      id,
      ...updateCultivoRealDto,
    });

    if (!cultivoReal) {
      throw new NotFoundException(`CultivoReal con id ${id} no encontrado`);
    }

    try {
      await this.cultivoRealRepository.save(cultivoReal);

      return cultivoReal;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: number) {
    const cultivoReal = await this.findOne(id);

    await this.cultivoRealRepository.remove(cultivoReal);

    return {
      message: 'Cultivo eliminado correctamente',
    };
  }

  private handleDBExceptions(error: any): never {
    this.logger.error(error);

    throw new InternalServerErrorException('Error interno del servidor');
  }
}
