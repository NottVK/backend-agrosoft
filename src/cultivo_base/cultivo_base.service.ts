import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateCultivoBaseDto } from './dto/create-cultivo_base.dto';
import { UpdateCultivoBaseDto } from './dto/update-cultivo_base.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CultivoBase } from './entities/cultivo_base.entity';
import { Repository } from 'typeorm';


@Injectable()
export class CultivoBaseService {

  constructor(
    @InjectRepository(CultivoBase)
    private readonly cultivoBaseRepository: Repository <CultivoBase>
  ){}
  async create(createCultivoBaseDto: CreateCultivoBaseDto) {
    try{
      const cultivoBase = this.cultivoBaseRepository.create(createCultivoBaseDto)
      await this.cultivoBaseRepository.save(cultivoBase);
    }catch (error) {
      console.log(error)
      throw new InternalServerErrorException('Error al crear cultivo base ');
    }
  }

  async findAll() {
    return this.cultivoBaseRepository.find();
  }

  async findOne(id: string){
    const cultivoBase= await this.cultivoBaseRepository.findOneBy({id});
    if (!cultivoBase){
      throw new NotFoundException(`Cultivo base con id ${id} no existe`);
    }
    return cultivoBase;
  }



  async update(id: string, updateCultivoBaseDto: UpdateCultivoBaseDto) {
    const cultivoBase = await this.cultivoBaseRepository.preload({
      id, 
      ...updateCultivoBaseDto, 
    });
    if (!cultivoBase){
      throw new NotFoundException(`Cultivo base con id ${id} no existe `)
    }
    try{
      await this.cultivoBaseRepository.save(cultivoBase);
      return cultivoBase;
    }catch (error){
      console.log(error)
      throw new InternalServerErrorException('Error al actualizar Cultivo base')
    }
  }
  async remove(id: string) {
    const cultivoBase= await this.findOne(id)
    await this.cultivoBaseRepository.remove(cultivoBase)
    return 'Cultivo base eliminada con exito';

  }
}
