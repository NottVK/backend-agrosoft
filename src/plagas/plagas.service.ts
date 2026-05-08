import { Injectable } from '@nestjs/common';
import { CreatePlagasDto } from './dto/create-plagas.dto';
import { UpdatePlagasDto } from './dto/update-plagas.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Plagas } from './entities/plagas.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PlagasService {
  constructor(
    @InjectRepository(Plagas)
    private readonly plagasRepository: Repository<Plagas>,
  ) {}
  
  async create(createPlagasDto: CreatePlagasDto){
    const plagas = this.plagasRepository.create(createPlagasDto);
    return await this.plagasRepository.save(plagas);   
  }

  findAll() {
    return  this.plagasRepository.find();
  }

  findOne(id: number) {
    return this.plagasRepository.findOneBy({id_plagas: id});
  }

  async update(id: number, updatePlagasDto: UpdatePlagasDto) {
    await this.plagasRepository.update(id, updatePlagasDto); 
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.plagasRepository.delete(id);  
    return {message: 'Plagas ha sido eliminado correctamente'};
  }
}
