import { Module } from '@nestjs/common';
import { PlanDeManejoService } from './plan_de_manejo.service';
import { PlanDeManejoController } from './plan_de_manejo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanDeManejo } from './entities/plan_de_manejo.entity';

@Module({
  controllers: [PlanDeManejoController],
  providers: [PlanDeManejoService],
  imports: [TypeOrmModule.forFeature([PlanDeManejo])],
})
export class PlanDeManejoModule {}
