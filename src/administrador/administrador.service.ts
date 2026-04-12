import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Administrador } from './entities/administrador.entity';

@Injectable()
export class AdministradorService { // Verifica que diga "export class"
  constructor(
    @InjectRepository(Administrador)
    private administradorRepository: Repository<Administrador>,
  ) {}

  findAll() {
    return this.administradorRepository.find();
  }
}