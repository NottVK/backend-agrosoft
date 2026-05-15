import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

import { CreatePlagasDto } from './dto/create-plagas.dto';
import { UpdatePlagasDto } from './dto/update-plagas.dto';

import { InjectRepository } from '@nestjs/typeorm';

import { Plagas } from './entities/plagas.entity';

import { Repository } from 'typeorm';

@Injectable()
export class PlagasService {
  private readonly logger = new Logger(PlagasService.name);

  constructor(
    @InjectRepository(Plagas)
    private readonly plagasRepository: Repository<Plagas>,
  ) {}

  async create(createPlagasDto: CreatePlagasDto): Promise<Plagas> {
    try {
      const plagas = this.plagasRepository.create(createPlagasDto);

      return await this.plagasRepository.save(plagas);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll(): Promise<Plagas[]> {
    return await this.plagasRepository.find();
  }

  async findOne(id: number): Promise<Plagas> {
    const plagas = await this.plagasRepository.findOneBy({
      id_plagas: id,
    });

    if (!plagas) {
      throw new NotFoundException(`Plaga con id ${id} no encontrada`);
    }

    return plagas;
  }

  async update(id: number, updatePlagasDto: UpdatePlagasDto): Promise<Plagas> {
    const plagas = await this.plagasRepository.preload({
      id_plagas: id,
      ...updatePlagasDto,
    });

    if (!plagas) {
      throw new NotFoundException(`Plaga con id ${id} no encontrada`);
    }

    try {
      await this.plagasRepository.save(plagas);

      return plagas;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: number) {
    const plagas = await this.findOne(id);

    await this.plagasRepository.remove(plagas);

    return {
      message: 'Plaga eliminada correctamente',
    };
  }

  private handleDBExceptions(error: any): never {
    this.logger.error(error);

    throw new InternalServerErrorException('Error interno del servidor');
  }
}
