import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateVisitanteDto } from './dto/create-visitante.dto';
import { UpdateVisitanteDto } from './dto/update-visitante.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Visitante } from './entities/visitante.entity';
import { Repository } from 'typeorm/browser/repository/Repository.js';

@Injectable()
export class VisitanteService {
  constructor(
    @InjectRepository(Visitante)
    private readonly visitanteRepository: Repository<Visitante>,
  ) {}
  async create(createVisitanteDto: CreateVisitanteDto) {
    try {
      const visitante = this.visitanteRepository.create(createVisitanteDto);
      return await this.visitanteRepository.save(visitante);
    } catch (error) {
      throw new InternalServerErrorException('Error al crear el visitante');
    }
  }

  async findAll() {
    return await this.visitanteRepository.find();
  }

  async findOne(id: number) {
    const visitante = await this.visitanteRepository.findOneBy({ id });
    if (!visitante) {
      throw new NotFoundException(`Visitante con id ${id} no encontrado`);
    }
    return visitante;
  }

  async update(id: number, updateVisitanteDto: UpdateVisitanteDto) {
    const visitante = await this.visitanteRepository.preload({
      id,
      ...updateVisitanteDto,
    });
    if (!visitante) {
      throw new NotFoundException(`Visitante con id ${id} no encontrado`);
    }
    try {await this.visitanteRepository.save(visitante);
      return visitante;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error al actualizar el visitante');
    }
}
async remove(id: number) {    
  const visitante = await this.findOne(id);
await this.visitanteRepository.remove(visitante);
return { message: `Visitante con id ${id} eliminado correctamente`, };
  }
}