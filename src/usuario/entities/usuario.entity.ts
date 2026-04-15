import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('usuario')
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;

  @Column({ type: 'varchar', length: 100 })
    nombre: string;

    @Column({ type: 'varchar', unique: true })
    correo: string;

  @Column({ type: 'varchar' })
    contraseña: string;

  @Column({ default: true })
    activo: boolean;

  @Column({ type: 'varchar', length: 20, nullable: true })
    telefono: string;
}
