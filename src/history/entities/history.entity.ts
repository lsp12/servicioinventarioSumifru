import { Inventory } from 'src/inventory/entities/inventory.entity';
import { Ranch } from 'src/ranch/entities/ranch.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class History {
  @PrimaryGeneratedColumn()
  idHistorial: number;

  @Column()
  fechaMovimiento: Date;

  @ManyToOne(() => Inventory, (inventory) => inventory.histories, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  inventario: Inventory;

  @ManyToOne(() => User, (user) => user.histories, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  user: User;

  @ManyToOne(() => Ranch, (ranch) => ranch.histories, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  ranch: Ranch;
}
