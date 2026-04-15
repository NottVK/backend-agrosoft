import { Module } from '@nestjs/common';
import { ActividadEjecutadaService } from './actividad-ejecutada.service';
import { ActividadEjecutadaController } from './actividad-ejecutada.controller';
import { ActividadEjecutada } from './entities/actividad-ejecutada.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ActividadEjecutadaController],
  providers: [ActividadEjecutadaService],
  imports: [TypeOrmModule.forFeature([ActividadEjecutada])],
})
export class ActividadEjecutadaModule {}
