import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn()
  nativeKey!: string;

  @Column({ nullable: false })
  id!: string;

  @Column({ nullable: false })
  genero!: string; // 1 = Feminino, 2 = Masculino

  @Column({ nullable: false })
  edad!: string;

  @Column({ nullable: false })
  nivelAcademico!: string; // 1=Bachiller, 2=Tecnico, 3=Universitario

  @Column({ nullable: false })
  estrato!: string;

  @Column({ nullable: false })
  ciudad!: string;

  @Column({ nullable: false })
  cantHijos!: string;

  @Column({ nullable: false })
  numSalarios!: string;

  @Column({ nullable: false })
  pensiondado!: string;

  @Column({ nullable: false })
  tipoTarjeta!: string;

  @Column({ nullable: false })
  deseaTarjeta!: string;

  @Column({ nullable: false })
  cantArticulos!: string;

  @Column({ nullable: false })
  articuloMasComprado!: string;

  @Column({ nullable: false })
  mesDeMasCompras!: string;

  @Column({ nullable: false })
  compraEnQuincena!: string;

  @Column({ nullable: false })
  artiucloMasDeseado!: string;
}
