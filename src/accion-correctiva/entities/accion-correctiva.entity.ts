import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('accion_correctiva')
export class AccionCorrectiva {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  fechaAtencion: Date;

  @Column({ type: 'text' })
  resultadopreliminar: string;

  @Column('float', { default: 0 })
  cantidadUsada: number;

  @Column('float', { default: 0 })
  CostoAplicado: number;
}
