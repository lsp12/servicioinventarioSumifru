import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UnitMd {
  @PrimaryGeneratedColumn()
  idUnidadMedida: number;

  @Column()
  tipoUnida: string;
}
