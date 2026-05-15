import {
  Injectable,
  NotFoundException,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePlanDeManejoDto } from './dto/create-plan_de_manejo.dto';
import { UpdatePlanDeManejoDto } from './dto/update-plan_de_manejo.dto';
import { PlanDeManejo } from './entities/plan_de_manejo.entity';

@Injectable()
export class PlanDeManejoService {
  private readonly logger = new Logger(PlanDeManejoService.name);

  constructor(
    @InjectRepository(PlanDeManejo)
    private readonly plandemanejoRepository: Repository<PlanDeManejo>,
  ) {}

  async create(
    createPlanDemanejoDto: CreatePlanDeManejoDto,
  ): Promise<PlanDeManejo> {
    try {
      const plandemanejo = this.plandemanejoRepository.create(
        createPlanDemanejoDto,
      );
      return await this.plandemanejoRepository.save(plandemanejo);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll(): Promise<PlanDeManejo[]> {
    return await this.plandemanejoRepository.find();
  }

  async findOne(id: string): Promise<PlanDeManejo> {
    const plandemanejo = await this.plandemanejoRepository.findOneBy({ id });
    if (!plandemanejo) {
      throw new NotFoundException(`Plan de Manejo con id ${id} no encontrado`);
    }
    return plandemanejo;
  }

  async update(
    id: string,
    updatePlanDemanejoDto: UpdatePlanDeManejoDto,
  ): Promise<PlanDeManejo> {
    const plandemanejo = await this.plandemanejoRepository.preload({
      id,
      ...updatePlanDemanejoDto,
    });

    if (!plandemanejo) {
      throw new NotFoundException(`Plan de Manejo con id ${id} no encontrado`);
    }
    try {
      await this.plandemanejoRepository.save(plandemanejo);
      return plandemanejo;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    const plandemanejo = await this.findOne(id);
    await this.plandemanejoRepository.remove(plandemanejo);
    return { message: `Plan de Manejo con id ${id} eliminado` };
  }

  private handleDBExceptions(error: any): never {
    this.logger.error(error);
    throw new InternalServerErrorException('Error en la base de datos');
  }
}
