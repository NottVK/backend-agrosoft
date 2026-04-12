import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Administrador {
  @PrimaryGeneratedColumn()
  idAdmin!: number;

  @Column()
  idUsuario!: number;

  @Column()
  idRol!: number;
}