import { Module } from '@nestjs/common';
import { EvidenciaService } from './evidencia.service';
import { EvidenciaController } from './evidencia.controller';

@Module({
  providers: [EvidenciaService],
  controllers: [EvidenciaController]
})
export class EvidenciaModule {}
