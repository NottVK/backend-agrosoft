import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Logger,
} from '@nestjs/common';

import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';

import { InjectRepository } from '@nestjs/typeorm';

import { Venta } from './entities/venta.entity';

import { Repository } from 'typeorm';

@Injectable()
export class VentaService {
  private readonly logger = new Logger(VentaService.name);

  constructor(
    @InjectRepository(Venta)
    private readonly ventaRepository: Repository<Venta>,
  ) {}

  async create(createVentaDto: CreateVentaDto): Promise<Venta> {
    try {
      const venta = this.ventaRepository.create(createVentaDto);

      return await this.ventaRepository.save(venta);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll(): Promise<Venta[]> {
    return await this.ventaRepository.find();
  }

  async findOne(id: string): Promise<Venta> {
    const venta = await this.ventaRepository.findOneBy({
      id,
    });

    if (!venta) {
      throw new NotFoundException(`Venta con id ${id} no existe`);
    }

    return venta;
  }

  async update(id: string, updateVentaDto: UpdateVentaDto): Promise<Venta> {
    const venta = await this.ventaRepository.preload({
      id,
      ...updateVentaDto,
    });

    if (!venta) {
      throw new NotFoundException(`Venta con id ${id} no existe`);
    }

    try {
      await this.ventaRepository.save(venta);

      return venta;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    const venta = await this.findOne(id);

    await this.ventaRepository.remove(venta);

    return {
      message: 'Venta eliminada correctamente',
    };
  }

  private handleDBExceptions(error: any): never {
    this.logger.error(error);

    throw new InternalServerErrorException('Error interno del servidor');
  }
}
