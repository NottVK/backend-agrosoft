import { Injectable, InternalServerErrorException, NotFoundException, } from '@nestjs/common';
import { CreateCoordinadorDto } from './dto/create-coordinador.dto';
import { UpdateCoordinadorDto } from './dto/update-coordinador.dto';
import { Coordinador } from './entities/coordinador.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';

@Injectable()
export class CoordinadorService {
  constructor(
    @InjectRepository(Coordinador)
    private readonly coordinadorRepository: Repository<Coordinador>,
  ) {}
  async create(createCoordinadorDto: CreateCoordinadorDto) {
    try {
      const coordinador = this.coordinadorRepository.create(createCoordinadorDto);
      return await this.coordinadorRepository.save(coordinador);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error al crear el coordinador');
    }

}
async findAll() {
    return await this.coordinadorRepository.find();
  }
  async findOne(id: number) {
    const coordinador = await this.coordinadorRepository.findOneBy({ id });

    if (!coordinador) {
      throw new NotFoundException(`Coordinador con id ${id} no encontrado`);
    }
    return coordinador;
  }

  async update(id: number, updateCoordinadorDto: UpdateCoordinadorDto) {
    const coordinador = await this.coordinadorRepository.preload({
      id,
      ...updateCoordinadorDto,
    });
    if (!coordinador) {
      throw new NotFoundException(`Coordinador con id ${id} no encontrado`);
    }
    try {
      await this.coordinadorRepository.save(coordinador);
      return coordinador;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error al actualizar el coordinador');
    }
  }
  async remove(id: number) {    
    const coordinador = await this.findOne(id);
    await this.coordinadorRepository.remove(coordinador);
    return { message: `Coordinador con id ${id} eliminado correctamente`, };
  }
}

