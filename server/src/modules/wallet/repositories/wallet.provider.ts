import { Connection } from 'typeorm';
import { DATABASE_CONNECTION } from '../../../data-access';
import { Wallet } from '../entities';

export const WALLET_REPOSITORY = 'WALLET_REPOSITORY';

export const walletProviders = [
  {
    provide: WALLET_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(Wallet),
    inject: [DATABASE_CONNECTION],
  },
];
