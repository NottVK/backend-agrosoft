import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Venta {
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column('date')
    fechav: string

    @Column('number')
    cantidad:number

    @Column('varchar')
    presiou:string

    @Column('varchar')
    ingresot:string

    @Column('text')
        forpago: string

    @Column('text')
        estadop: string
    
}
