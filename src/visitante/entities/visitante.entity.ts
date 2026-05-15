import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Visitante {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  id_rol: number;

  @Column()
  id_usuario: number;
}
