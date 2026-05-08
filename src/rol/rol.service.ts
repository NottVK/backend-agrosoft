import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';

import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Rol } from './entities/rol.entity';

import { Repository } from 'typeorm';

@Injectable()
export class RolService {
  constructor(
    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,
  ) {}

  async create(createRolDto: CreateRolDto) {
    try {
      const rol = this.rolRepository.create(createRolDto);

      return await this.rolRepository.save(rol);
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException('Error al crear el rol');
    }
  }

  async findAll() {
    return await this.rolRepository.find();
  }

  async findOne(id: number) {
    const rol = await this.rolRepository.findOneBy({ id });

    if (!rol) {
      throw new NotFoundException(`Rol con id ${id} no encontrado`);
    }

    return rol;
  }

  async update(id: number, updateRolDto: UpdateRolDto) {
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
      console.log(error);

      throw new InternalServerErrorException('Error al actualizar el rol');
    }
  }

  async remove(id: number) {
    const rol = await this.findOne(id);

    await this.rolRepository.remove(rol);

    return {
      message: 'Rol eliminado correctamente',
    };
  }
}
