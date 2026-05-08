import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateInstructorDto } from './dto/create-instructor.dto';
import { UpdateInstructorDto } from './dto/update-instructor.dto';
import { Instructor } from './entities/instructor.entity'; // Ahora sí coinciden

@Injectable()
export class InstructorService {
  constructor(
    @InjectRepository(Instructor)
    private readonly instructorRepository: Repository<Instructor>,
  ) {}

  async create(createInstructorDto: CreateInstructorDto) {
    try {
      const instructor = this.instructorRepository.create(createInstructorDto);
      return await this.instructorRepository.save(instructor);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error al crear el instructor');
    }
  }

  async findAll() {
    return await this.instructorRepository.find();
  }

  async findOne(id: number) {
    // Buscamos por el nombre exacto de la columna en la entidad
    const instructor = await this.instructorRepository.findOneBy({
      id_instructor: id,
    });

    if (!instructor) {
      throw new NotFoundException(`Instructor con id ${id} no encontrado`);
    }

    return instructor;
  }

  async update(id: number, updateInstructorDto: UpdateInstructorDto) {
    const instructor = await this.instructorRepository.preload({
      id_instructor: id,
      ...updateInstructorDto,
    });

    if (!instructor) {
      throw new NotFoundException(`Instructor con id ${id} no encontrado`);
    }

    try {
      return await this.instructorRepository.save(instructor);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'Error al actualizar el instructor',
      );
    }
  }

  async remove(id: number) {
    const instructor = await this.findOne(id);
    await this.instructorRepository.remove(instructor);
    return {
      message: 'Instructor eliminado correctamente',
    };
  }
}
