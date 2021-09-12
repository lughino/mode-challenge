import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
// eslint-disable-next-line import/no-cycle
import { Transaction } from '../../transaction/entities';

@Entity()
export class Wallet {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 500, default: 'Default', unique: true })
  name!: string;

  @Column('float', { default: 0 })
  balance!: number;

  @OneToMany(() => Transaction, (transaction) => transaction.wallet)
  transactions!: Transaction[];

  @CreateDateColumn({ type: 'datetime' })
  created!: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updated!: Date;

  @Exclude({ toPlainOnly: true })
  @DeleteDateColumn({ type: 'datetime' })
  deleted?: Date;
}
