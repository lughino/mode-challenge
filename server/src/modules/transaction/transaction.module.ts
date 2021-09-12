import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../data-access';
import { TransactionService } from './repositories';
import { WalletModule } from '../wallet';
import { TransactionController } from './controllers/http';
import * as useCases from './use-cases';
import { Transaction } from './entities';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Transaction]), WalletModule],
  controllers: [TransactionController],
  providers: [TransactionService, ...Object.values(useCases)],
})
export class TransactionModule {}
