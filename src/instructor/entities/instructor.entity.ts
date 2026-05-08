import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('instructor')
export class Instructor { 

    @PrimaryGeneratedColumn() 
    id_instructor: number;

    @Column()
    especialidad: string;
}