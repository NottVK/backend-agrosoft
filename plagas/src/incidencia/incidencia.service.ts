import { Injectable } from '@nestjs/common';
import { CreateIncidenciaDto } from './dto/create-incidencia.dto';
import { UpdateIncidenciaDto } from './dto/update-incidencia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Incidencia } from './entities/incidencia.entity';
import { Repository } from 'typeorm';

@Injectable()
export class IncidenciaService {
  constructor(
    @InjectRepository(Incidencia)
    private readonly incidenciaRepository: Repository <Incidencia>,
  ) {}
  
  async create(createIncidenciaDto: CreateIncidenciaDto) {
    const incidencia = this.incidenciaRepository.create(createIncidenciaDto); 
    return await this.incidenciaRepository.save(incidencia);
  }

  findAll() {
    return this.incidenciaRepository.find();
  }

  findOne(id: number) {
    return this.incidenciaRepository.findOneBy({ id_incidencia: id });
  }

  async update(id: number, updateIncidenciaDto: UpdateIncidenciaDto) {
    await this.incidenciaRepository.update(id, updateIncidenciaDto); 
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.incidenciaRepository.delete(id);
    return { message: 'Incidencia elimina correctamente'};
  }
}
