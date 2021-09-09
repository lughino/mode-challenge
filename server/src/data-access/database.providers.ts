import { createConnection } from 'typeorm';
import path from 'path';

export const DATABASE_CONNECTION = 'DATABASE_CONNECTION';

export const databaseProviders = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: async () =>
      await createConnection({
        type: 'sqlite',
        database: path.join(__dirname, '..', '..', 'db', 'modo.sql'),
        synchronize: true,
      }),
  },
];
