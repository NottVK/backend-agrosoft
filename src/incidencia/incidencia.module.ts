import { Module } from '@nestjs/common';
import { IncidenciaService } from './incidencia.service';
import { IncidenciaController } from './incidencia.controller';
import { Incidencia } from './entities/incidencia.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [IncidenciaController],
  providers: [IncidenciaService],
  imports: [TypeOrmModule.forFeature([Incidencia])],
})
export class IncidenciaModule {}
