import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('cultivo_base')
export class CultivoBase{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'text'})
    plan_manejo:string;

    @Column({type: 'varchar', length: 200})
    nombre_cultivo: string;

    @Column({type: 'varchar', length: 80})
    tipo_cultivo: string;

    @Column({type:'text'})
    descripcion:string;

    @Column({type: 'varchar', length: 30, default: 'bueno'})
    estado_cultivo: string;
}
