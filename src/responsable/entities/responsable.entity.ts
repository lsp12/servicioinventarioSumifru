import { Inventory } from 'src/inventory/entities/inventory.entity';
import { Ranch } from 'src/ranch/entities/ranch.entity';
import { Reporte } from 'src/reporte/entities/reporte.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity()
export class Responsable {
  @PrimaryGeneratedColumn()
  idResponsable: number;

  @CreateDateColumn({ type: 'timestamp' })
  fechaIngreso: Date;

  //muchos a uno

  @ManyToOne(() => Ranch, (ranch) => ranch.responsables, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  ranch: number;

  @ManyToOne(() => Inventory, (inventory) => inventory.responsables, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  inventory: number;

  @ManyToOne(() => User, (user) => user.responsables, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  user: number;

  @OneToMany(() => Reporte, (reporte) => reporte.responsable)
  reportes: Reporte[];
}
