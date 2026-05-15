import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateInsumoDto } from './dto/create-insumo.dto';
import { UpdateInsumoDto } from './dto/update-insumo.dto';

import { Insumo } from './entities/insumo.entity';

@Injectable()
export class InsumoService {
  private readonly logger = new Logger(InsumoService.name);

  constructor(
    @InjectRepository(Insumo)
    private readonly insumoRepository: Repository<Insumo>,
  ) {}

  async create(createInsumoDto: CreateInsumoDto): Promise<Insumo> {
    try {
      const insumo = this.insumoRepository.create(createInsumoDto);

      return await this.insumoRepository.save(insumo);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll(): Promise<Insumo[]> {
    return await this.insumoRepository.find();
  }

  async findOne(id: number): Promise<Insumo> {
    const insumo = await this.insumoRepository.findOneBy({ id });

    if (!insumo) {
      throw new NotFoundException(`Insumo con id ${id} no encontrado`);
    }

    return insumo;
  }

  async update(id: number, updateInsumoDto: UpdateInsumoDto): Promise<Insumo> {
    const insumo = await this.insumoRepository.preload({
      id,
      ...updateInsumoDto,
    });

    if (!insumo) {
      throw new NotFoundException(`Insumo con id ${id} no encontrado`);
    }

    try {
      await this.insumoRepository.save(insumo);

      return insumo;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: number) {
    const insumo = await this.findOne(id);

    await this.insumoRepository.remove(insumo);

    return {
      message: 'Insumo eliminado correctamente',
    };
  }

  private handleDBExceptions(error: any): never {
    this.logger.error(error);

    throw new InternalServerErrorException('Error interno del servidor');
  }
}
