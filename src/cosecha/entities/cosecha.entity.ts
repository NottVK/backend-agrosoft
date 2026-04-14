import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Cosecha')
export class Cosecha {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'date' })
    fechaCosecha!: Date;

    @Column('float',{default:0})
    Cantidad: number;

    @Column({type:'varchar', length: 50})
    Unidad_Medida: string;

    @Column({type:'varchar', length: 100})
    Tipo_Cosecha: string;

    @Column({type: 'text', nullable: true})
    Observaciones: string;




}

