import { Inventory } from 'src/inventory/entities/inventory.entity';
import { Responsable } from 'src/responsable/entities/responsable.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Ranch {
  @PrimaryGeneratedColumn()
  idHaciendad: number;

  @Column()
  nombre: string;

  @Column()
  condigoHacienda: string;

  @OneToMany(() => Responsable, (responsable) => responsable.ranch, {
    eager: true
  })
  responsables: Responsable[];
}
