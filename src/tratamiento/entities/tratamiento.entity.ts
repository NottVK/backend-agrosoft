import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tratamiento')
export class Tratamiento {
  @PrimaryGeneratedColumn()
  id_tratamiento: number;

  @Column()
  id_insumo: number; // Luego lo relacionaremos con la tabla Insumo

  @Column()
  cantidad_sugerida: number;

  @Column()
  tipo_tratamiento: string;

  @Column()
  id_usuario: number; // El usuario que registra el tratamiento

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ type: 'date' })
  fecha_aplicacion_tratamiento: Date;

  @Column()
  cantidad_usada: number;
}