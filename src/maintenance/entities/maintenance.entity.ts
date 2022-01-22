import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Maintenance {
  @PrimaryGeneratedColumn()
  idMantenimiento: number;

  @Column()
  numMantenimiento: string;

  @Column()
  motivo: string;

  @Column()
  fechaInicio: Date;

  @Column({ nullable: true })
  fechaFin: Date;
}
