import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('evidencias')
export class Evidencia {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  tipoEvidencia: string;

  @Column({ type: 'text' })
  archivoUrl: string;

  @Column({ type: 'text' })
  descripcion: string;

  @Column({ type: 'date' })
  fechaRegistro: Date;

  @Column({ type: 'text', nullable: true })
  observaciones?: string;

  @Column({ type: 'text', nullable: true })
  resultadoPreliminar?: string;

}