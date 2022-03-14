import { Ranch } from 'src/ranch/entities/ranch.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Assignment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Ranch, (Ranch) => Ranch.assignments)
  ranch: number;

  @ManyToOne(() => User, (User) => User.assignments)
  user: number;
}
