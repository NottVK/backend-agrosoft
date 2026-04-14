import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('instructor')
export class instructor {

    @PrimaryGeneratedColumn('uuid')
    id_instructor: number;

    @Column()
    especialidad: string;
}
