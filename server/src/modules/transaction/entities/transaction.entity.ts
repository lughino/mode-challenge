import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Wallet } from '../../wallet/entities';

export enum TransactionType {
  CREDIT = 'credit',
  DEBIT = 'debit',
}

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('float')
  amount!: number;

  @Column({ type: 'enum', enum: TransactionType, default: TransactionType.DEBIT })
  type!: TransactionType;

  @ManyToOne(() => Wallet, (wallet) => wallet.transactions)
  wallet!: Wallet;
}
