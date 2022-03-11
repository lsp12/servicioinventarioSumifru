import { History } from 'src/history/entities/history.entity';
import { Responsable } from 'src/responsable/entities/responsable.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  idUsuario: number;

  @Column()
  nombre: string;

  @Column()
  numCedula: string;

  @Column({ default: false })
  contraseña: string;

  @Column()
  role: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(() => Responsable, (Responsable) => Responsable.user)
  responsables: Responsable[];

  @OneToMany(() => History, (History) => History.user)
  histories: History[];
}
