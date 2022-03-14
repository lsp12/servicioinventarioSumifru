import { Assignment } from 'src/assignment/entities/assignment.entity';
import { History } from 'src/history/entities/history.entity';
import { Mandated } from 'src/mandated/entities/mandated.entity';
import { Responsable } from 'src/responsable/entities/responsable.entity';
import { User } from 'src/users/entities/user.entity';
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

  @OneToMany(() => Assignment, (Assignment) => Assignment.ranch)
  assignments: Assignment[];

  @ManyToOne(() => Zona, (Zona) => Zona.ranch)
  zona: number;
}
