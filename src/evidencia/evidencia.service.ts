import { Injectable } from '@nestjs/common';
import { Evidencia } from './entities/evidencia.entity';

@Injectable()
export class EvidenciaService {
  private evidencias: Evidencia[] = [];

  create(nueva: any) {
    this.evidencias.push(nueva);
    return { mensaje: 'Evidencia registrada', data: nueva };
  }

  findAll() {
    return this.evidencias;
  }
}