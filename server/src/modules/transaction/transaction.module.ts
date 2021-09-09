import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../data-access';
import { transactionProviders } from './repositories/transaction.provider';
import { TransactionService } from './repositories/transaction.service';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [...transactionProviders, TransactionService],
})
export class TransactionModule {}
