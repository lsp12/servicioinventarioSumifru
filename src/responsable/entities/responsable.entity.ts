import { Inventory } from 'src/inventory/entities/inventory.entity';
import { Maintenance } from 'src/maintenance/entities/maintenance.entity';
import { Ranch } from 'src/ranch/entities/ranch.entity';
import { Reporte } from 'src/reporte/entities/reporte.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
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

  @OneToOne(() => Inventory, (inventory) => inventory.responsables, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn()
  inventory: number;

  @ManyToOne(() => User, (user) => user.responsables, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  user: number;

  /* @OneToMany(() => Reporte, (reporte) => reporte.responsable)
  reportes: Reporte[]; */

  @OneToMany(() => Maintenance, (Maintenance) => Maintenance.responsable)
  maintenance: Maintenance[];
}
