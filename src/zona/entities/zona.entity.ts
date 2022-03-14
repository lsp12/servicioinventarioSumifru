import { Ranch } from 'src/ranch/entities/ranch.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Zona {
  @PrimaryGeneratedColumn()
  idZona: number;

  @Column()
  nombre: string;

  @OneToMany(() => Ranch, (Ranch) => Ranch.zona)
  ranch: Ranch[];

  @ManyToOne(() => User, (User) => User.zona)
  users: number;
}

/* Entity();
export class Zona {
  @PrimaryGeneratedColumn()
  idZona: number;

  @Column()
  nombre: string;
  
  @OneToMany(() => Ranch, (Ranch) => Ranch.zona)
  ranch: Ranch[];
}
 */
