import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEnfermedadeDto } from './dto/create-enfermedade.dto';
import { UpdateEnfermedadeDto } from './dto/update-enfermedade.dto';
import { Repository } from 'typeorm';
import { Enfermedade } from './entities/enfermedade.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EnfermedadesService {
  insumoRepository: any;
  enfermedadeRepository: any;
  constructor(
    @InjectRepository(Enfermedade)
    private readonly EnfermedadeRepository: Repository<Enfermedade>,
  ) {}

  async create(createEnfermedadeDto: CreateEnfermedadeDto) {
    const Enfermedade = this.enfermedadeRepository.create(createEnfermedadeDto);
    return await this.enfermedadeRepository.save(Enfermedade);
  }

  findAll() {
    return this.enfermedadeRepository.find();
  }

  findOne(id: number) {
    return this.enfermedadeRepository.findOneBy({ id });
  }

  async update(id: string, updateEnfermedadeDto: UpdateEnfermedadeDto) {
    return this.enfermedadeRepository.update(id, updateEnfermedadeDto);
  }

  async remove(id: string) {
    return this.enfermedadeRepository.delete(id);
  }
}