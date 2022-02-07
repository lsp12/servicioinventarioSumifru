import { Inventory } from 'src/inventory/entities/inventory.entity';
import { Ranch } from 'src/ranch/entities/ranch.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class History {
  @PrimaryGeneratedColumn()
  idHistorial: number;

  @Column({ type: 'timestamp' })
  fechaMovimiento: Date;

  @ManyToOne(() => Inventory, (inventory) => inventory.histories, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  inventario: number;

  @ManyToOne(() => User, (user) => user.histories, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  user: number;

  @ManyToOne(() => Ranch, (ranch) => ranch.histories, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  ranch: number;
}
