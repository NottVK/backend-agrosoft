import {Injectable,InternalServerErrorException,NotFoundException,} from '@nestjs/common';

import { CreateAprendizDto } from './dto/create-aprendiz.dto';
import { UpdateAprendizDto } from './dto/update-aprendiz.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Aprendiz } from './entities/aprendiz.entity';

@Injectable()
export class AprendizService {
  constructor(
    @InjectRepository(Aprendiz)
    private readonly aprendizrepository: Repository<Aprendiz>,
  ) {}

  async create(createAprendizDto: CreateAprendizDto) {
    try {
      const aprendiz = this.aprendizrepository.create(createAprendizDto);
      await this.aprendizrepository.save(aprendiz);
      return aprendiz;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error al crear el aprendiz');
    }
  }

  async findAll() {
    return await this.aprendizrepository.find();
  }

  async findOne(id: string) {
    // CAMBIO: Se usa id_tratamiento porque así se llama en tu @Entity
    const aprendiz = await this.aprendizrepository.findOneBy({ id_tratamiento: id });

    if (!aprendiz) {
      throw new NotFoundException(`Aprendiz con id ${id} no existe`);
    }

    return aprendiz;
  }

  async update(id: string, updateAprendizDto: UpdateAprendizDto) {
    const aprendiz = await this.aprendizrepository.preload({
      id_tratamiento: id, 
      ...updateAprendizDto,
    });

    if (!aprendiz) {
      throw new NotFoundException(`Aprendiz con id ${id} no existe`);
    }

    try {
      await this.aprendizrepository.save(aprendiz);
      return aprendiz;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error al actualizar el aprendiz');
    }
  }

  async remove(id: string) {
    const aprendiz = await this.findOne(id);
    await this.aprendizrepository.remove(aprendiz);
    return { message: 'Aprendiz eliminado con éxito' };
  }
}
