import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Insumo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  category: string;

  @Column()
  unit: string;

  @Column('float', { default: 0 })
  availableQuantity: number;

  @Column({ default: 'active' })
  status: string;

  @Column('float', { default: 0 })
  unitPrice: number;
}