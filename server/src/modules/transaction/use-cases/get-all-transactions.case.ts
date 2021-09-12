import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { Operation } from '../../../app/Operation';
import { Transaction } from '../entities';
import { TransactionService } from '../repositories';

@Injectable()
export class GetAllTransactionsCase implements Operation {
  private logger = new Logger('GetAllTransactionsCase');

  constructor(private readonly transactionService: TransactionService) {}

  public async execute(walletId: string): Promise<Transaction[]> {
    try {
      const transactions = await this.transactionService.findByWalletId(walletId);

      return transactions;
    } catch (error) {
      this.logger.log(error, 'execute');
      throw new InternalServerErrorException();
    }
  }
}
