import { Inventory } from 'src/inventory/entities/inventory.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  idCategoria: number;

  @Column()
  nombre: string;

  @OneToMany(() => Inventory, (inventory) => inventory.category, {
    eager: true
  })
  inventories: Inventory[];
}
