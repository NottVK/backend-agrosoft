import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';

import { InjectRepository } from '@nestjs/typeorm';

import { Rol } from './entities/rol.entity';

import { Repository } from 'typeorm';

@Injectable()
export class RolService {
  private readonly logger = new Logger(RolService.name);

  constructor(
    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,
  ) {}

  async create(createRolDto: CreateRolDto): Promise<Rol> {
    try {
      const rol = this.rolRepository.create(createRolDto);

      return await this.rolRepository.save(rol);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll(): Promise<Rol[]> {
    return await this.rolRepository.find();
  }

  async findOne(id: number): Promise<Rol> {
    const rol = await this.rolRepository.findOneBy({ id });

    if (!rol) {
      throw new NotFoundException(`Rol con id ${id} no encontrado`);
    }

    return rol;
  }

  async update(id: number, updateRolDto: UpdateRolDto): Promise<Rol> {
    const rol = await this.rolRepository.preload({
      id,
      ...updateRolDto,
    });

    if (!rol) {
      throw new NotFoundException(`Rol con id ${id} no encontrado`);
    }

    try {
      await this.rolRepository.save(rol);

      return rol;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: number) {
    const rol = await this.findOne(id);

    await this.rolRepository.remove(rol);

    return {
      message: 'Rol eliminado correctamente',
    };
  }

  private handleDBExceptions(error: any): never {
    this.logger.error(error);

    throw new InternalServerErrorException('Error interno del servidor');
  }
}
