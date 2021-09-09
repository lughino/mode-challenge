import { Connection } from 'typeorm';
import { DATABASE_CONNECTION } from '../../../data-access';
import { Transaction } from '../entities';

export const TRANSACTION_REPOSITORY = 'TRANSACTION_REPOSITORY';

export const transactionProviders = [
  {
    provide: TRANSACTION_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(Transaction),
    inject: [DATABASE_CONNECTION],
  },
];
