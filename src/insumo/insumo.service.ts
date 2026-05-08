import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateInsumoDto } from './dto/create-insumo.dto';
import { UpdateInsumoDto } from './dto/update-insumo.dto';

import { Insumo } from './entities/insumo.entity';

@Injectable()
export class InsumoService {
  constructor(
    @InjectRepository(Insumo)
    private readonly insumoRepository: Repository<Insumo>,
  ) {}

  async create(createInsumoDto: CreateInsumoDto) {
    try {
      const insumo = this.insumoRepository.create(createInsumoDto);

      return await this.insumoRepository.save(insumo);
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException('Error al crear el insumo');
    }
  }

  async findAll() {
    return await this.insumoRepository.find();
  }

  async findOne(id: number) {
    const insumo = await this.insumoRepository.findOneBy({ id });

    if (!insumo) {
      throw new NotFoundException(`Insumo con id ${id} no encontrado`);
    }

    return insumo;
  }

  async update(id: number, updateInsumoDto: UpdateInsumoDto) {
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
      console.log(error);

      throw new InternalServerErrorException('Error al actualizar el insumo');
    }
  }

  async remove(id: number) {
    const insumo = await this.findOne(id);

    await this.insumoRepository.remove(insumo);

    return {
      message: 'Insumo eliminado correctamente',
    };
  }
}
