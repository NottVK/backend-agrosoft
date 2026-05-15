import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Logger,
} from '@nestjs/common';

import { CreateAprendizDto } from './dto/create-aprendiz.dto';
import { UpdateAprendizDto } from './dto/update-aprendiz.dto';
import { Aprendiz } from './entities/aprendiz.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AprendizService {
  private readonly logger = new Logger(AprendizService.name);

  constructor(
    @InjectRepository(Aprendiz)
    private readonly AprendizRepository: Repository<Aprendiz>,
  ) {}

  async create(createAprendizDto: CreateAprendizDto): Promise<Aprendiz> {
    try {
      const aprendiz = this.AprendizRepository.create(createAprendizDto);

      return await this.AprendizRepository.save(aprendiz);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }
  async findAll(): Promise<Aprendiz[]> {
    return await this.AprendizRepository.find();
  }

  async findOne(id: string): Promise<Aprendiz> {
    const aprendiz = await this.AprendizRepository.findOneBy({ id });
    if (!aprendiz) {
      throw new NotFoundException(`Aprendiz with ID ${id} not found`);
    }
    return aprendiz;
  }

  async update(
    id: string,
    updateAprendizDto: UpdateAprendizDto,
  ): Promise<Aprendiz> {
    const aprendiz = await this.AprendizRepository.preload({
      id,
      ...updateAprendizDto,
    });
    if (!aprendiz) {
      throw new NotFoundException(`Aprendiz with ID ${id} not found`);
    }
    try {
      await this.AprendizRepository.save(aprendiz);
      return aprendiz;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }
  async remove(id: string) {
    const aprendiz = await this.findOne(id);
    await this.AprendizRepository.remove(aprendiz);
    return { message: `Aprendiz with ID ${id} has been removed` };
  }
  private handleDBExceptions(error: any): never {
    this.logger.error(error);
    throw new InternalServerErrorException('Database error occurred');
  }
}
