import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Incidencia {
    @PrimaryGeneratedColumn()
    id_incidencia!: number;

    @CreateDateColumn({ type: 'timestamp' })
    fecha!: Date;

    @Column({ type: 'varchar', length: 50 })
    tipo_incidencia!: string;

    @Column({ type: 'varchar', length: 20 })
    gravedad!: string;

    @Column({ type: 'text' })
    descripcion!: string;

  // Llaves foráneas como columnas para evitar errores
    @Column({ type: 'int' })
    id_plagas!: number;

    @Column({ type: 'int', nullable: true })
    id_enfermedades!: number;

    @Column({ type: 'int' })
    id_usuario!: number;

    @Column({ type: 'int' })
    id_cultivo_real!: number;
}
