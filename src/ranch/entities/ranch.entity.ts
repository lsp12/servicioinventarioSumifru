import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Ranch {
  @PrimaryGeneratedColumn()
  idHaciendad: number;

  @Column()
  nombre: string;
}
