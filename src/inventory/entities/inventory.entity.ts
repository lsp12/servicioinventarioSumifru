import { Category } from 'src/category/entities/category.entity';
import { History as Hi } from 'src/history/entities/history.entity';
import { Maintenance } from 'src/maintenance/entities/maintenance.entity';
import { Provider } from 'src/provider/entities/provider.entity';
import { Reporte } from 'src/reporte/entities/reporte.entity';
import { Responsable } from 'src/responsable/entities/responsable.entity';
import { UnitMd } from 'src/unit-md/entities/unit-md.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Inventory {
  @PrimaryGeneratedColumn()
  idInventario: number;

  @Column()
  numSerie: string;

  @Column({ default: 'buen estado' })
  estado: string;

  @Column()
  nombreProducto: string;

  @Column({ type: 'boolean', default: false })
  mantenimieto: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'boolean', default: false })
  inUse: boolean;

  //muchos a uno

  @ManyToOne(() => Category, (category) => category.inventories, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  category: number;

  @ManyToOne(() => UnitMd, (UnitMd) => UnitMd.inventories, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  unitMd: number;

  @ManyToOne(() => Provider, (Provider) => Provider.inventories, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  provider: number;

  //uno a muchos

  @OneToOne(() => Responsable, (Responsable) => Responsable.inventory)
  responsables: Responsable;

  @OneToMany(() => Hi, (Hi) => Hi.inventario)
  histories: Hi[];

  /* @OneToMany(() => Maintenance, (Maintenance) => Maintenance.inventory)
  maintenance: Maintenance[]; */

  @OneToMany(() => Reporte, (Reporte) => Reporte.inventory)
  reporte: Reporte[];
}
