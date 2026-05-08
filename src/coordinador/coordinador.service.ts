import { Injectable } from '@nestjs/common';
import { CreateCoordinadorDto } from './dto/create-coordinador.dto';
import { UpdateCoordinadorDto } from './dto/update-coordinador.dto';

@Injectable()
export class CoordinadorService {
  create(createCoordinadorDto: CreateCoordinadorDto) {
    return 'This action adds a new coordinador';
  }

  findAll() {
    return `This action returns all coordinador`;
  }

  findOne(id: number) {
    return `This action returns a #${id} coordinador`;
  }

  update(id: number, updateCoordinadorDto: UpdateCoordinadorDto) {
    return `This action updates a #${id} coordinador`;
  }

  remove(id: number) {
    return `This action removes a #${id} coordinador`;
  }
}
