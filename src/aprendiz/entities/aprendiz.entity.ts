import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Aprendiz {

  @PrimaryGeneratedColumn('uuid')
  id_tratamiento: string;

  @Column()
  id_insumo: string;

  @Column()
  actividad_sugerida: string;

  @Column()
  orden: number;

  @Column()
  tipo_tratamiento: string;

  @Column({
    type: 'date',
  })
  fecha_aplicacion_tratamiento: Date;

  @Column('text')
  descripcion: string;

  @Column({
    type: 'decimal'
  })
  cantidad_sugeridad: number;
}