import { Category } from 'src/category/entities/category.entity';
import { Maintenance } from 'src/maintenance/entities/maintenance.entity';
import { Provider } from 'src/provider/entities/provider.entity';
import { Responsable } from 'src/responsable/entities/responsable.entity';
import { UnitMd } from 'src/unit-md/entities/unit-md.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity()
export class Inventory {
  @PrimaryGeneratedColumn()
  idInventario: number;

  @Column()
  numSerie: string;

  @Column()
  nombreProducto: string;

  @Column()
  cantidad: number;

  //muchos a uno

  @ManyToOne(() => Category, (category) => category.inventories, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  category: number;

  @ManyToOne(() => UnitMd, (UnitMd) => UnitMd.inventories, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  unitMd: number;

  @ManyToOne(() => Provider, (Provider) => Provider.inventories, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  provider: number;

  //uno a muchos

  @OneToMany(() => Responsable, (Responsable) => Responsable.inventory)
  responsables: Responsable[];

  @OneToMany(() => Maintenance, (Maintenance) => Maintenance.inventory)
  maintenances: Maintenance[];

  @OneToMany(() => Responsable, (Responsable) => Responsable.inventory)
  histories: History[];
}
