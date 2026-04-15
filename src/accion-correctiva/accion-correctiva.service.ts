import { Injectable } from '@nestjs/common';
import { CreateAccionCorrectivaDto } from './dto/create-accion-correctiva.dto';
import { UpdateAccionCorrectivaDto } from './dto/update-accion-correctiva.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AccionCorrectiva } from './entities/accion-correctiva.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AccionCorrectivaService {
  constructor(
    @InjectRepository(AccionCorrectiva)
    private readonly accionCorrectivaRepository: Repository<AccionCorrectiva>,
  ) {}
  async create(createAccionCorrectivaDto: CreateAccionCorrectivaDto) {
    const accionCorrectiva = this.accionCorrectivaRepository.create(
      createAccionCorrectivaDto,
    );
    return await this.accionCorrectivaRepository.save(accionCorrectiva);
  }

  async findAll() {
    return await this.accionCorrectivaRepository.find();
  }

  async findOne(id: number) {
    const accionCorrectiva = await this.accionCorrectivaRepository.findOneBy({
      id,
    });
    if (!accionCorrectiva) {
      throw new Error(`AccionCorrectiva con id ${id} no encontrado`);
    }
    return accionCorrectiva;
  }

  async update(
    id: number,
    updateAccionCorrectivaDto: UpdateAccionCorrectivaDto,
  ) {
    await this.findOne(id);
    await this.accionCorrectivaRepository.update(id, updateAccionCorrectivaDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const accionCorrectiva = await this.findOne(id);
    await this.accionCorrectivaRepository.remove(accionCorrectiva);
    return { message: `AccionCorrectiva eliminada correctamente` };
  }
}
