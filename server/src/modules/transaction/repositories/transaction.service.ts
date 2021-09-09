import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TRANSACTION_REPOSITORY } from './transaction.provider';
import { Transaction } from '../entities';

@Injectable()
export class TransactionService {
  constructor(
    @Inject(TRANSACTION_REPOSITORY)
    private transactionRepository: Repository<Transaction>,
  ) {}

  async findAll(): Promise<Transaction[]> {
    return this.transactionRepository.find();
  }
}
