import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('administradores')
export class Administrador {

  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  id_rol: number;

  @Column('int')
  id_usuario: number;

}