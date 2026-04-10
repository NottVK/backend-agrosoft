import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cultivo_real')
export class CultivoReal {
  @PrimaryGeneratedColumn()
  id: number;

    @Column('date')
  StartDate: Date;

  @Column('float')
  Area: number;

  @Column({
    default: 'activo',
  })
  status: string;
}
