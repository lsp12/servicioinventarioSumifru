import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
