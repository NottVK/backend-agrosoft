import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tratamientos')
export class Tratamiento {

  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  id_insumo: number; // luego lo puedes convertir a relación

  @Column('float', { default: 0 })
  cantidadSugerida: number;

  @Column({ type: 'varchar', length: 100 })
  tipoTratamiento: string;

  @Column('int')
  id_usuario: number;

  @Column({ type: 'text', nullable: true })
  descripcion?: string;

  @Column({ type: 'date' })
  fechaAplicacion: Date;

  @Column('float', { default: 0 })
  cantidadUsada: number;

}