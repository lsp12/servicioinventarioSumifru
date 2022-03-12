import { History } from 'src/history/entities/history.entity';
import { Mandated } from 'src/mandated/entities/mandated.entity';
import { Responsable } from 'src/responsable/entities/responsable.entity';
import { Zona } from 'src/zona/entities/zona.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Ranch {
  @PrimaryGeneratedColumn()
  idHaciendad: number;

  @Column()
  nombre: string;

  @Column()
  condigoHacienda: string;

  @OneToMany(() => Responsable, (responsable) => responsable.ranch)
  responsables: Responsable[];

  @OneToMany(() => History, (History) => History.ranch)
  histories: History[];

  @OneToMany(() => Mandated, (mandated) => mandated.ranch)
  mandated: Mandated[];

  @ManyToOne(() => Zona, (Zona) => Zona.ranch)
  zona: number;
}
