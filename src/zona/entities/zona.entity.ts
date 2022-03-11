import { Ranch } from 'src/ranch/entities/ranch.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Zona {
  @PrimaryGeneratedColumn()
  idZona: number;

  @Column()
  nombre: string;

  @OneToMany(() => Ranch, (Ranch) => Ranch.zona)
  ranch: Ranch[];
}

/* Entity();
export class Zona {
  @PrimaryGeneratedColumn()
  idZona: number;

  @Column()
  nombre: string;
  
  @OneToMany(() => Ranch, (Ranch) => Ranch.zona)
  ranch: Ranch[];
}
 */
