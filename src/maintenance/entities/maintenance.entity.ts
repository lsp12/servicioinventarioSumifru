import { Inventory } from 'src/inventory/entities/inventory.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Maintenance {
  @PrimaryGeneratedColumn()
  idMantenimiento: number;

  @Column()
  numMantenimiento: string;

  @Column()
  motivo: string;

  @Column()
  fechaInicio: Date;

  @Column({ nullable: true })
  fechaFin: Date;

  @ManyToOne(() => Inventory, (inventory) => inventory.maintenances, {
    cascade: true
  })
  inventory: Inventory;
}
