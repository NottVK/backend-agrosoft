import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCosechaDto } from './dto/create-cosecha.dto';
import { UpdateCosechaDto } from './dto/update-cosecha.dto';
import { Cosecha } from './entities/cosecha.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CosechaService {
  constructor(
    @InjectRepository(Cosecha)
    private readonly CosechaRepository: Repository<Cosecha>,
  ){}
  async create(createCosechaDto: CreateCosechaDto) {
    const Cosecha = this.CosechaRepository.create(createCosechaDto);
    return await this.CosechaRepository.save(Cosecha);
  }

  async findAll() {
    return await this.CosechaRepository.find();
  }

  async findOne(id: number) {
    const Cosecha = await this.CosechaRepository.findOneBy({ id });

    if (!Cosecha) {
      throw new NotFoundException(' cosecha con id ${id} no encontrado')
    }

    return  Cosecha
  }

  async update(id: number, updateCosechaDto: UpdateCosechaDto) {
    await this.findOne(id);

    await this.CosechaRepository.update(id, updateCosechaDto)

    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    
    await this.CosechaRepository.delete(id);

    return { message: 'cosecha eliminada correctamente'};
   
  }
}
