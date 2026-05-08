import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IncidenciaService } from './incidencia.service';
import { IncidenciaController } from './incidencia.controller';
import { Incidencia } from './entities/incidencia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Incidencia]) ],
  controllers: [IncidenciaController],
  providers: [IncidenciaService],
})
export class IncidenciaModule {}