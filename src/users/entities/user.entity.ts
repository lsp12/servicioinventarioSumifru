import { Assignment } from 'src/assignment/entities/assignment.entity';
import { History } from 'src/history/entities/history.entity';
import { Ranch } from 'src/ranch/entities/ranch.entity';
import { Responsable } from 'src/responsable/entities/responsable.entity';
import { Role } from 'src/role/entities/role.entity';
import { Zona } from 'src/zona/entities/zona.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(() => Responsable, (Responsable) => Responsable.user)
  responsables: Responsable[];

  @OneToMany(() => History, (History) => History.user)
  histories: History[];

  @ManyToOne(() => Role, (Role) => Role.users)
  role: number | Role;

  @OneToMany(() => Zona, (Zona) => Zona.users)
  zona: Zona[];

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  fullAccess: boolean;

  @OneToMany(() => Assignment, (Assignment) => Assignment.user)
  assignments: Assignment[];
}
