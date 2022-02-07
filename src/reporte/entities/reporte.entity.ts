import { Inventory } from 'src/inventory/entities/inventory.entity';
import { Responsable } from 'src/responsable/entities/responsable.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity()
export class Reporte {
  @PrimaryGeneratedColumn()
  idReporte: number;

  @Column()
  reporte: string;

  @Column()
  estado: string;

  @CreateDateColumn({ type: 'timestamp' })
  fechaIngreso: Date;

  /* @ManyToOne(() => Responsable, (Responsable) => Responsable.reportes, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  responsable: number; */

  @ManyToOne(() => Inventory, (Inventory) => Inventory.reporte, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  inventory: number;
}
