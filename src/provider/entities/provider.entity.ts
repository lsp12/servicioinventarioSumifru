import { Inventory } from 'src/inventory/entities/inventory.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Provider {
  @PrimaryGeneratedColumn()
  idProvedor: number;

  @Column()
  nombre: string;

  @Column({ default: false })
  direccion: string;

  @Column({ default: false })
  telefono: string;

  @OneToMany(() => Inventory, (inventory) => inventory.provider, {
    eager: true
  })
  inventories: Inventory[];
}
