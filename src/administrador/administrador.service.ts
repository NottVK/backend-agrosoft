import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdministradorDto } from './dto/create-administrador.dto';
import { UpdateAdministradorDto } from './dto/update-administrador.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Administrador } from './entities/administrador.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdministradorService {
  constructor(
    @InjectRepository(Administrador)
    private readonly administradorRepository: Repository<Administrador>,
  ) {}

  async create(createAdministradorDto: CreateAdministradorDto) {
    const admin = this.administradorRepository.create(createAdministradorDto);
    return await this.administradorRepository.save(admin);
  }

  async findAll() {
    return await this.administradorRepository.find();
  }

  async findOne(id: number) {
    const admin = await this.administradorRepository.findOneBy({ id });

    if (!admin) {
      throw new NotFoundException(`Administrador con id ${id} no encontrado`);
    }

    return admin;
  }

  async update(id: number, updateAdministradorDto: UpdateAdministradorDto) {
    await this.findOne(id);
    await this.administradorRepository.update(id, updateAdministradorDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.administradorRepository.delete(id);
    return { message: 'Administrador eliminado correctamente' };
  }
}
