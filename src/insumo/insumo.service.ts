import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateInsumoDto } from './dto/create-insumo.dto';
import { UpdateInsumoDto } from './dto/update-insumo.dto';
import { Repository } from 'typeorm';
import { Insumo } from './entities/insumo.entity';

@Injectable()
export class InsumoService {
  constructor(
    @InjectRepository(Insumo)
    private insumoRepository: Repository<Insumo>,
  ) {}

  async create(createInsumoDto: CreateInsumoDto) {
    const insumo = this.insumoRepository.create(createInsumoDto);
    return await this.insumoRepository.save(insumo);
  }

  async findAll() {
    return await this.insumoRepository.find();
  }

  async findOne(id: string) {
    const insumo = await this.insumoRepository.findOneBy({ id });

    if (!insumo) {
      throw new NotFoundException(`Insumo con id ${id} no encontrado`);
    }

    return insumo;
  }

  async update(id: string, updateInsumoDto: UpdateInsumoDto) {
    await this.findOne(id);

    await this.insumoRepository.update(id, updateInsumoDto);

    return this.findOne(id);
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.insumoRepository.delete(id);

    return { message: `Insumo eliminado correctamente` };
  }
}
