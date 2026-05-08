import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Plagas {

    @PrimaryGeneratedColumn()
    id_plagas!: number; 

    @Column({ type: 'varchar', length: 100})
    nombre_plaga!: string;
    
    @Column({ type: 'varchar', length: 20})
    grado_daño!: string; 

    @Column({ type: 'int', nullable: true})
    id_plan_manejo?: number; 
}