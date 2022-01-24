import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  idUsuario: number;

  @Column()
  nombre: string;

  @Column({ default: false })
  contraseña: string;

  @Column()
  role: string;
}
