import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';

import { CreateCosechaDto } from './dto/create-cosecha.dto';
import { UpdateCosechaDto } from './dto/update-cosecha.dto';

import { Cosecha } from './entities/cosecha.entity';

import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CosechaService {
  constructor(
    @InjectRepository(Cosecha)
    private readonly cosechaRepository: Repository<Cosecha>,
  ) {}

  async create(createCosechaDto: CreateCosechaDto) {
    try {
      const cosecha = this.cosechaRepository.create(createCosechaDto);

      return await this.cosechaRepository.save(cosecha);
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException('Error al crear la cosecha');
    }
  }

  async findAll() {
    return await this.cosechaRepository.find();
  }

  async findOne(id: number) {
    const cosecha = await this.cosechaRepository.findOneBy({ id });

    if (!cosecha) {
      throw new NotFoundException(`Cosecha con id ${id} no encontrada`);
    }

    return cosecha;
  }

  async update(id: number, updateCosechaDto: UpdateCosechaDto) {
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
      console.log(error);

      throw new InternalServerErrorException('Error al actualizar la cosecha');
    }
  }

  async remove(id: number) {
    const cosecha = await this.findOne(id);

    await this.cosechaRepository.remove(cosecha);

    return {
      message: 'Cosecha eliminada correctamente',
    };
  }
}
