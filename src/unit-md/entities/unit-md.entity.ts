import { Inventory } from 'src/inventory/entities/inventory.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UnitMd {
  @PrimaryGeneratedColumn()
  idUnidadMedida: number;

  @Column()
  tipoUnida: string;

  @OneToMany(() => Inventory, (Inventory) => Inventory.unitMd)
  inventories: Inventory[];
}
