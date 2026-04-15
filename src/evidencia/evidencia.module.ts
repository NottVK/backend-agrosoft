import { Module } from '@nestjs/common';
import { EvidenciaService } from './evidencia.service';
import { EvidenciaController } from './evidencia.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Evidencia } from './entities/evidencia.entity';

@Module({
  controllers: [EvidenciaController],
  providers: [EvidenciaService],
  imports: [TypeOrmModule.forFeature([Evidencia])],
})
export class EvidenciaModule {}
