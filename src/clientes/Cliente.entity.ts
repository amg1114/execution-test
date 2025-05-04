import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "int", nullable: false })
  genero!: number; // 1 = Feminino, 2 = Masculino

  @Column({ type: "int", nullable: false })
  edad!: number;

  @Column({ type: "int", nullable: false })
  nivelAcademico!: number; // 1=Bachiller, 2=Tecnico, 3=Universitario

  @Column({ type: "int", nullable: false })
  ciudad!: number;

  @Column({ type: "int", nullable: false })
  cantHijos!: number;

  @Column({ type: "int", nullable: false })
  numSalarios!: number;

  @Column({ type: "int", nullable: false })
  pensiondado!: number;

  @Column({ type: "int", nullable: false })
  tipoTarjeta!: number;

  @Column({ type: "int", nullable: false })
  deseaTarjeta!: number;

  @Column({ type: "int", nullable: false })
  cantArticulos!: number;

  @Column({ type: "int", nullable: false })
  articuloMasComprado!: number;

  @Column({ type: "int", nullable: false })
  mesDeMasCompras!: number;

  @Column({ type: "int", nullable: false })
  compraEnQuincena!: number;

  @Column({ type: "int", nullable: false })
  artiucloMasDeseado!: number;
}
