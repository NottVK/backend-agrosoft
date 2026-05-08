import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Visitante {
  @PrimaryGeneratedColumn()
  id: number;
}
