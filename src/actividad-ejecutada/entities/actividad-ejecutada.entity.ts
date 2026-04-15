import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ActividadEjecutada')
export class ActividadEjecutada {

    @PrimaryGeneratedColumn()
    id: number;

  @Column({ type: 'date' })
    fecha: Date;

  @Column('float', { default: 0 })
    CantidadUsada: number;

  @Column('float', { default: 0 })
    CostoAplicado: number;

  @Column({ type: 'text', nullable: true })
    Observaciones: string;
}
