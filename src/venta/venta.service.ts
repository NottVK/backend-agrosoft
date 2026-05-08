import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Venta } from './entities/venta.entity';
import { Repository } from 'typeorm';
import { error } from 'console';
import { NotFoundError } from 'rxjs';

@Injectable()
export class VentaService {
  constructor(
    @InjectRepository(Venta)
    private readonly ventaRepository: Repository<Venta>,
  ){}
  async create(createVentaDto: CreateVentaDto) {
    try{
      const venta= this.ventaRepository.create(createVentaDto)
      await this.ventaRepository.save(venta);
    }
    catch (error){
    console.log(error)
    throw new InternalServerErrorException('error al registrar la venta')
    }
  }

  async findAll() {
    return this.ventaRepository.find();
  }

  async findOne(id: string) {
      const venta=await this.ventaRepository.findOneBy({id});
      if (!venta){
        throw new  NotFoundException(`venta con id ${id} no existe`)
      }
      return venta;
    }
  
    async update(id: string, updateVentaDto: UpdateVentaDto) {
      const venta=await this.ventaRepository.preload({
        id,
        ... updateVentaDto,
      });
      if (!venta){
        throw new NotFoundException(`reporte con id ${id} no existe`);
      }
      
  try {
        await this.ventaRepository.save(venta);
        return venta;
      } catch (error) {
        console.log(error);
        throw new InternalServerErrorException('No se pudo actualizar');
      }
    
  
    }
  
    async remove(id: string) {
      const venta =await this.findOne(id);
      await this.ventaRepository.remove(venta);
      return { mensaje: 'venta eliminado correctamente' };
    }
    }