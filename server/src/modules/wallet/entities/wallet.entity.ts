import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Transaction } from "../../transaction/entities";

@Entity()
export class Wallet {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 500, default: 'Default', unique: true })
  name!: string;

  @Column('float')
  balance!: number;

  @OneToMany(() => Transaction, (transaction) => transaction.wallet)
  transactions!: Transaction[];
}
