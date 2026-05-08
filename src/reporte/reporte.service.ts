import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateReporteDto } from './dto/create-reporte.dto';
import { UpdateReporteDto } from './dto/update-reporte.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reporte } from './entities/reporte.entity';
import { error } from 'console';

@Injectable()
export class ReporteService {
  constructor(
    @InjectRepository(Reporte)
    private readonly reporteRepository: Repository<Reporte>,
  ){}
  async create(createReporteDto: CreateReporteDto) {
  try{
    const reporte=this.reporteRepository.create(createReporteDto)
    await this.reporteRepository.save(reporte);
  }
  catch (error){
    console.log(error)
    throw new InternalServerErrorException('error al registrar el reporte')
  }
  }

  async findAll() {
    return this.reporteRepository.find();
  }

  async findOne(id: string) {
    const reporte=await this.reporteRepository.findOneBy({id});
    if (!reporte){
      throw new NotFoundException(`reporte con id ${id} no existe`)
    }
    return reporte;
  }

  async update(id: string, updateReporteDto: UpdateReporteDto) {
    const reporte=await this.reporteRepository.preload({
      id,
      ... updateReporteDto,
    });
    if (!reporte){
      throw new NotFoundException('reporte con id ${id} no existe');
    }
    
try {
      await this.reporteRepository.save(reporte);
      return reporte;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('No se pudo actualizar');
    }
  

  }

  async remove(id: string) {
    const reporte =await this.findOne(id);
    await this.reporteRepository.remove(reporte);
    return { mensaje: 'reporte eliminado correctamente' };
  }
  }

