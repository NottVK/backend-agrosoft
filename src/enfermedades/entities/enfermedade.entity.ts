import { Entity, Column, PrimaryGeneratedColumn, } from 'typeorm';

@Entity('enfermedades')
export class Enfermedade {

@PrimaryGeneratedColumn('uuid')
    id_enfermedad: string;

    @Column()
    nombre_enfermedad: string;

    @Column()
    grado_daño: string;
}
