import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity()
export class Doc {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  departamento: string;

  @Column()
  nSemanas: number;

  @Column()
  path: string;

  @Column()
  originalname: string;

  @Column()
  filePath: string;

  @CreateDateColumn()
  createdAt: Date;
}
