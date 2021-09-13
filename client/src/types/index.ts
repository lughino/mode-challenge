// eslint-disable-next-line no-shadow
export enum TransactionType {
  CREDIT = 'credit',
  DEBIT = 'debit',
}

export interface Transaction {
  id: string;
  amount: number;
  date: Date;
  type: TransactionType;
}

export type TransactionDto = Omit<Transaction, 'id' | 'date'>;

export interface Wallet {
  id: string;
  name: string;
  balance: number;
  created: Date;
  updated: Date;
}
