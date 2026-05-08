
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Reporte {
    @PrimaryGeneratedColumn('uuid')
    id:string
    
    @Column('text')
    tipo:string
    
    @Column('date')
    fechai:string
    
    @Column('text')
    formato:string
}
