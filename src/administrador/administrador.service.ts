import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

import { CreateAdministradorDto } from './dto/create-administrador.dto';
import { UpdateAdministradorDto } from './dto/update-administrador.dto';

import { InjectRepository } from '@nestjs/typeorm';

import { Administrador } from './entities/administrador.entity';

import { Repository } from 'typeorm';

@Injectable()
export class AdministradorService {
  private readonly logger = new Logger(AdministradorService.name);

  constructor(
    @InjectRepository(Administrador)
    private readonly administradorRepository: Repository<Administrador>,
  ) {}

  async create(createAdministradorDto: CreateAdministradorDto) {
    try {
      const admin = this.administradorRepository.create(createAdministradorDto);

      return await this.administradorRepository.save(admin);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll(): Promise<Administrador[]> {
    return await this.administradorRepository.find();
  }

  async findOne(id: number): Promise<Administrador> {
    const admin = await this.administradorRepository.findOneBy({ id });

    if (!admin) {
      throw new NotFoundException(`Administrador con id ${id} no encontrado`);
    }

    return admin;
  }

  async update(
    id: number,
    updateAdministradorDto: UpdateAdministradorDto,
  ): Promise<Administrador> {
    const admin = await this.administradorRepository.preload({
      id,
      ...updateAdministradorDto,
    });

    if (!admin) {
      throw new NotFoundException(`Administrador con id ${id} no encontrado`);
    }

    try {
      await this.administradorRepository.save(admin);

      return admin;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: number) {
    const admin = await this.findOne(id);

    await this.administradorRepository.remove(admin);

    return {
      message: 'Administrador eliminado correctamente',
    };
  }

  private handleDBExceptions(error: any): never {
    this.logger.error(error);

    throw new InternalServerErrorException('Error interno del servidor');
  }
}
