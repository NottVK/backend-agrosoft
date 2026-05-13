import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePlanDeManejoDto } from './dto/create-plan_de_manejo.dto';
import { UpdatePlanDeManejoDto } from './dto/update-plan_de_manejo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PlanDeManejo } from './entities/plan_de_manejo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PlanDeManejoService {

  constructor(
    @InjectRepository(PlanDeManejo)
    private readonly planDeManejoRepository: Repository <PlanDeManejo>
  ){}
  async create(createPlanDeManejoDto: CreatePlanDeManejoDto) {
    try{
      const planDeManejo= this.planDeManejoRepository.create(createPlanDeManejoDto)
      await this.planDeManejoRepository.save(planDeManejo);
    } catch (error){
      console.log(error)
      throw new InternalServerErrorException('Error al crear Plan de manejo');
    }
  }

  async findAll() {
    return this.planDeManejoRepository.find();
  }

  async findOne(id: string) {
    const planDeManejo= await this.planDeManejoRepository.findOneBy({id});
    if (!planDeManejo){
      throw new NotFoundException(`Plan de manejo con id ${id} no existe`);
    }
    return planDeManejo;
  }


  async update(id: string, updatePlanDeManejoDto: UpdatePlanDeManejoDto) {
    const planDeManejo= await this.planDeManejoRepository.preload({
      id, 
      ...updatePlanDeManejoDto, 
    });
    if (!planDeManejo){
      throw new NotFoundException(`plan de manejo con id ${id} no existe`)
    }
    try{
      await this.planDeManejoRepository.save(planDeManejo);
      return planDeManejo;
    }catch (error){
      console.log(error)
      throw new InternalServerErrorException('error al actualizar el plan de manejo ')
    }
    
  }

  async remove(id: string) {
    const planDeManejo=await this.findOne(id)
    await this.planDeManejoRepository.remove(planDeManejo)
    return 'plan de manejo eliminado exitosamente'
  }
}
