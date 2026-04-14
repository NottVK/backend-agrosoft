import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('rol')
export class Rol {

    @PrimaryGeneratedColumn('uuid')
    id_rol: string;

    @Column()
    nombre_rol: string;

    @Column()
    descripcion: string;

    @Column({ default: 'active' })
    estado: string;
}