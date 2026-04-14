import { Injectable } from '@nestjs/common';
import { CreateInstructorDto } from './dto/create-instructor.dto';
import { UpdateInstructorDto } from './dto/update-instructor.dto';
import { Repository } from 'typeorm';
import { instructor } from './entities/instructor.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class InstructorService {
  constructor(
    @InjectRepository(instructor)
    private readonly instructorRepository: Repository<instructor>,
  ){}

  async create(createinstructorDto: CreateInstructorDto) {
    const instructor = this.instructorRepository.create(createinstructorDto);
    return await this.instructorRepository.save(instructor);
  }

  findAll() {
    return this.instructorRepository.find();
  }

  findOne(id: number) {
    return this.instructorRepository.findOneBy({ id_instructor: id });
  }

  async update(id: number, updateInstructorDto: UpdateInstructorDto) {
    return this.instructorRepository.update(id, updateInstructorDto);
  }

  async remove(id: number) {
    return this.instructorRepository.delete(id);
  }
}
