import { Injectable } from '@nestjs/common';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';
import { Rol } from './entities/rol.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RolService {
  insumoRepository: any;
  enfermedadesRepository: any;
  instructorRepository: any;
  rolRepository: any;
  constructor(
    @InjectRepository(Rol)
    private readonly Rol:
    Repository<Rol>,
  ) {}

  async create(creaateRol:
    CreateRolDto) {
      const Rol = this.rolRepository.create(CreateRolDto);
      return await this.rolRepository.find();
    }

    findAll() {
      return this.rolRepository.finOneBy();
    }

    finOne(id: string) {
      return this.rolRepository.findOneBy({ id });
    }

    async update(id: string,
      updateRolDto: UpdateRolDto) {
        return this.rolRepository.update(id, updateRolDto);
      }

      async remove(id: string) {
        return this.rolRepository.delete(id);
      }
}
