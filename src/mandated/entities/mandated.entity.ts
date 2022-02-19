import { Ranch } from 'src/ranch/entities/ranch.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { MandatedStatus } from '../enum.mandated';

@Entity()
export class Mandated {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column()
  phone: string;

  @Column({
    type: 'enum',
    enum: MandatedStatus,
    default: MandatedStatus.NA
  })
  role: MandatedStatus;

  @ManyToOne(() => Ranch, (ranch) => ranch.mandated)
  ranch: number;
}
