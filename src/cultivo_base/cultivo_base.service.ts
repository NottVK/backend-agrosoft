import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateCultivoBaseDto } from './dto/create-cultivo_base.dto';
import { UpdateCultivoBaseDto } from './dto/update-cultivo_base.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CultivoBase } from './entities/cultivo_base.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CultivoBaseService {
  private readonly logger = new Logger(CultivoBaseService.name);

  constructor(
    @InjectRepository(CultivoBase)
    private readonly cultivoBaseRepository: Repository<CultivoBase>,
  ) {}

  async create(
    createCultivoBaseDto: CreateCultivoBaseDto,
  ): Promise<CultivoBase> {
    try {
      const cultivoBase =
        this.cultivoBaseRepository.create(createCultivoBaseDto);
      return await this.cultivoBaseRepository.save(cultivoBase);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll(): Promise<CultivoBase[]> {
    return await this.cultivoBaseRepository.find();
  }

  async findOne(id: string): Promise<CultivoBase> {
    const cultivoBase = await this.cultivoBaseRepository.findOneBy({ id });
    if (!cultivoBase) {
      throw new NotFoundException(
        `CultivoBase con id ${id} no encontrado`, // Ajustado a masculino
      );
    }
    return cultivoBase;
  }

  async update(
    id: string,
    updateCultivoBaseDto: UpdateCultivoBaseDto,
  ): Promise<CultivoBase> {
    const cultivoBase = await this.cultivoBaseRepository.preload({
      id,
      ...updateCultivoBaseDto,
    });
    if (!cultivoBase) {
      throw new NotFoundException(
        `CultivoBase con id ${id} no encontrado`, // Ajustado a masculino
      );
    }
    try {
      await this.cultivoBaseRepository.save(cultivoBase);
      return cultivoBase;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    const cultivoBase = await this.findOne(id);
    await this.cultivoBaseRepository.remove(cultivoBase);
    return { message: `CultivoBase con id ${id} eliminado` }; // Ajustado a masculino
  }

  private handleDBExceptions(error: any): never {
    this.logger.error(error);
    throw new InternalServerErrorException('Error de integridad de datos');
  }
}
