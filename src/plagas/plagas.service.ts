import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';

import { CreatePlagasDto } from './dto/create-plagas.dto';
import { UpdatePlagasDto } from './dto/update-plagas.dto';

import { InjectRepository } from '@nestjs/typeorm';

import { Plagas } from './entities/plagas.entity';

import { Repository } from 'typeorm';

@Injectable()
export class PlagasService {
  constructor(
    @InjectRepository(Plagas)
    private readonly plagasRepository: Repository<Plagas>,
  ) {}

  async create(createPlagasDto: CreatePlagasDto) {
    try {
      const plagas = this.plagasRepository.create(createPlagasDto);

      return await this.plagasRepository.save(plagas);
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException('Error al crear la plaga');
    }
  }

  async findAll() {
    return await this.plagasRepository.find();
  }

  async findOne(id: number) {
    const plagas = await this.plagasRepository.findOneBy({
      id_plagas: id,
    });

    if (!plagas) {
      throw new NotFoundException(`Plaga con id ${id} no encontrada`);
    }

    return plagas;
  }

  async update(id: number, updatePlagasDto: UpdatePlagasDto) {
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
      console.log(error);

      throw new InternalServerErrorException('Error al actualizar la plaga');
    }
  }

  async remove(id: number) {
    const plagas = await this.findOne(id);

    await this.plagasRepository.remove(plagas);

    return {
      message: 'Plaga eliminada correctamente',
    };
  }
}
