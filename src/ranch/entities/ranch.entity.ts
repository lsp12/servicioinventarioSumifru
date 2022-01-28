import { History } from 'src/history/entities/history.entity';
import { Responsable } from 'src/responsable/entities/responsable.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Ranch {
  @PrimaryGeneratedColumn()
  idHaciendad: number;

  @Column()
  nombre: string;

  @Column()
  condigoHacienda: string;

  @Column()
  zona: string;

  @OneToMany(() => Responsable, (responsable) => responsable.ranch)
  responsables: Responsable[];

  @OneToMany(() => History, (History) => History.ranch)
  histories: History[];
}
