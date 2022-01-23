import { Responsable } from 'src/responsable/entities/responsable.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  idUsuario: number;

  @Column()
  nombre: string;

  @Column()
  role: string;

  @OneToMany(() => Responsable, (Responsable) => Responsable.user, {
    eager: true
  })
  responsables: Responsable[];
}
