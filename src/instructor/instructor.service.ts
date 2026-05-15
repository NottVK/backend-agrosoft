import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateInstructorDto } from './dto/create-instructor.dto';
import { UpdateInstructorDto } from './dto/update-instructor.dto';

import { Instructor } from './entities/instructor.entity';

@Injectable()
export class InstructorService {
  private readonly logger = new Logger(InstructorService.name);

  constructor(
    @InjectRepository(Instructor)
    private readonly instructorRepository: Repository<Instructor>,
  ) {}

  async create(createInstructorDto: CreateInstructorDto): Promise<Instructor> {
    try {
      const instructor = this.instructorRepository.create(createInstructorDto);

      return await this.instructorRepository.save(instructor);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll(): Promise<Instructor[]> {
    return await this.instructorRepository.find();
  }

  async findOne(id: number): Promise<Instructor> {
    const instructor = await this.instructorRepository.findOneBy({
      id_instructor: id,
    });

    if (!instructor) {
      throw new NotFoundException(`Instructor con id ${id} no encontrado`);
    }

    return instructor;
  }

  async update(
    id: number,
    updateInstructorDto: UpdateInstructorDto,
  ): Promise<Instructor> {
    const instructor = await this.instructorRepository.preload({
      id_instructor: id,
      ...updateInstructorDto,
    });

    if (!instructor) {
      throw new NotFoundException(`Instructor con id ${id} no encontrado`);
    }

    try {
      await this.instructorRepository.save(instructor);

      return instructor;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: number) {
    const instructor = await this.findOne(id);

    await this.instructorRepository.remove(instructor);

    return {
      message: 'Instructor eliminado correctamente',
    };
  }

  private handleDBExceptions(error: any): never {
    this.logger.error(error);

    throw new InternalServerErrorException('Error interno del servidor');
  }
}
