import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Venta {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('date')
    fechav: Date; s

    @Column('int') 
    cantidad: number;

    @Column('decimal', { precision: 10, scale: 2 }) 
    presiou: number;

    @Column('decimal', { precision: 10, scale: 2 }) 
    ingresot: number;

    @Column('text')
    forpago: string;

    @Column('text')
    estadop: string;
}