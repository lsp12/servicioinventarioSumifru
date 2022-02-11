import { Inventory } from 'src/inventory/entities/inventory.entity';
import { Responsable } from 'src/responsable/entities/responsable.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity()
export class Maintenance {
  @PrimaryGeneratedColumn()
  idMantenimiento: number;

  @Column()
  numMantenimiento: number;

  @Column()
  motivo: string;

  @Column({ type: 'boolean', default: false })
  estado: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  fechaInicio: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  fechaFin: Date;

  /*  @ManyToOne(() => Responsable, (Responsable) => Responsable.maintenance, {
    cascade: true
  })
  responsable: number; */
  @ManyToOne(() => Inventory, (Inventory) => Inventory.maintenance, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  inventory: number;
}
