import { Injectable } from '@nestjs/common';
import { CreateTratamientoDto } from './dto/create-tratamiento.dto';
import { UpdateTratamientoDto } from './dto/update-tratamiento.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tratamiento } from './entities/tratamiento.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TratamientoService {
  constructor(
    @InjectRepository(Tratamiento)
    private tratamientoRepository: Repository<Tratamiento>,
  ) {}
  async create(createTratamientoDto: CreateTratamientoDto) {
    const tratamiento = this.tratamientoRepository.create(createTratamientoDto);
    return this.tratamientoRepository.save(tratamiento);
  }

  async findAll() {
    return this.tratamientoRepository.find();
  }

  async findOne(id: number) {
    const tratamiento = await this.tratamientoRepository.findOneBy({ id });
    if (!tratamiento) {
      throw new Error(`Tratamiento con id ${id} no encontrado`);
    }
    return tratamiento;
  }

  async update(id: number, updateTratamientoDto: UpdateTratamientoDto) {
    await this.findOne(id);
    await this.tratamientoRepository.update(id, updateTratamientoDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const tratamiento = await this.findOne(id);
    await this.tratamientoRepository.delete(tratamiento);
    return { message: `Tratamiento eliminado correctamente` };
  }
}
