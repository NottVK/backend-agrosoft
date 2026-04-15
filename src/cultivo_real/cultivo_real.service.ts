import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCultivoRealDto } from './dto/create-cultivo_real.dto';
import { UpdateCultivoRealDto } from './dto/update-cultivo_real.dto';
import { CultivoReal } from './entities/cultivo_real.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CultivoRealService {
  constructor(
    @InjectRepository(CultivoReal)
    private cultivoRealRepository: Repository<CultivoReal>,
  ) {}

  async create(createCultivoRealDto: CreateCultivoRealDto) {
    const cultivoReal = this.cultivoRealRepository.create(createCultivoRealDto);
    return await this.cultivoRealRepository.save(cultivoReal);
  }

  async findAll() {
    return await this.cultivoRealRepository.find();
  }

  async findOne(id: number) {
    const cultivoReal = await this.cultivoRealRepository.findOneBy({ id });

    if (!cultivoReal) {
      throw new NotFoundException(`CultivoReal con id ${id} no encontrado`);
    }

    return cultivoReal;
  }

  async update(id: number, updateCultivoRealDto: UpdateCultivoRealDto) {
    await this.findOne(id);

    await this.cultivoRealRepository.update(id, updateCultivoRealDto);

    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);

    await this.cultivoRealRepository.delete(id);

    return { message: `CultivoReal eliminado correctamente` };
  }
}
