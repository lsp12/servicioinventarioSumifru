import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Responsable {
  @PrimaryGeneratedColumn()
  idResponsable: number;

  @Column()
  nombre: string;

  @Column({ nullable: true })
  fechaRetiro: Date;

  @Column()
  fechaIngreso: Date;

  @Column({ array: true })
  justificacion: string;

  @Column()
  estado: string;
}
