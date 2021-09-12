import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { Repository } from 'typeorm';
import { TransactionFor } from 'nest-transact';
import { Transaction } from '../entities';
import { CreateTransactionDto } from '../dto';

@Injectable()
export class TransactionService extends TransactionFor<TransactionService> {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    moduleRef: ModuleRef,
  ) {
    super(moduleRef);
  }

  async findByWalletId(walletId: string): Promise<Transaction[]> {
    return this.transactionRepository.find({ where: { wallet: walletId } });
  }

  async findById(transactionId: string): Promise<Transaction | undefined> {
    return this.transactionRepository.findOne(transactionId);
  }

  async create(transaction: Transaction): Promise<Transaction> {
    return this.transactionRepository.save(transaction);
  }

  createEntity(transactionDto: CreateTransactionDto): Transaction {
    return this.transactionRepository.create(transactionDto);
  }
}
