import { Transaction, TransactionType } from '../types';

const gbFormatter = new Intl.NumberFormat('en-GB', {
  currency: 'GBP',
  minimumFractionDigits: 2,
  style: 'currency',
});

const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
});

export const dateHumanFormatter = (date: string) => dateFormatter.format(new Date(date));

export const currencyFormatter = (amount: number) => gbFormatter.format(amount);

export const calculateTotalSent = (transactions: Transaction[]): number =>
  transactions.reduce(
    (total, transaction) => (transaction.type === TransactionType.DEBIT ? total + transaction.amount : total),
    0,
  );
