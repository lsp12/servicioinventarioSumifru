import { Inventory } from 'src/inventory/entities/inventory.entity';
import { Ranch } from 'src/ranch/entities/ranch.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Responsable {
  @PrimaryGeneratedColumn()
  idResponsable: number;

  @Column()
  nombre: string;

  @Column({ nullable: true })
  fechaRetiro: Date;

  @Column()
  fechaIngreso: Date;

  @Column()
  justificacion: string;

  @Column()
  estado: string;

  //muchos a uno

  @ManyToOne(() => Ranch, (ranch) => ranch.responsables, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  ranch: Ranch;

  @ManyToOne(() => Inventory, (inventory) => inventory.responsables, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  inventory: Inventory;

  @ManyToOne(() => User, (user) => user.responsables, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  user: User;
}
