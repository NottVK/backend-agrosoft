import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('plan_de_manejo')
export class PlanDeManejo {
    @PrimaryGeneratedColumn('uuid')
    id:string;


    @Column({type:'varchar'})
    actividad_sugerida:string;

    @Column({type:'varchar'})
    orden:string;

    @Column({type:'varchar'})
    tiempo_sugerido:string;

    @Column({type:'varchar'})
    cantidad_sugerida:string;

    @Column({type: 'varchar'})
    unidad_medida:string;
}