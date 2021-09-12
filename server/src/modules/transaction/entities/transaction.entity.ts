import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
// eslint-disable-next-line import/no-cycle
import { Wallet } from '../../wallet/entities/wallet.entity';

// eslint-disable-next-line no-shadow
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

  @Column({ type: 'simple-enum', enum: TransactionType, default: TransactionType.DEBIT })
  type!: TransactionType;

  @ManyToOne(() => Wallet, (wallet) => wallet.transactions)
  wallet!: Wallet;

  @CreateDateColumn({ type: 'datetime' })
  date!: Date;
}
