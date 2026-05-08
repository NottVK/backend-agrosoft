import { Column, PrimaryGeneratedColumn } from "typeorm";

export class Coordinador {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('int')
    id_rol: number;
    
    @Column('int')
    id_usuario: number;
}
