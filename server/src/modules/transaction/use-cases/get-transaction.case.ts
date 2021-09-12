import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { Operation } from '../../../app/Operation';
import { Transaction } from '../entities';
import { TransactionService } from '../repositories';

@Injectable()
export class GetTransactionCase implements Operation {
  private logger = new Logger('GetTransactionCase');

  constructor(private readonly transactionService: TransactionService) {}

  public async execute(id: string): Promise<Transaction> {
    try {
      const transaction = await this.transactionService.findById(id);
      if (typeof transaction === 'undefined') {
        throw new NotFoundException();
      }

      return transaction;
    } catch (error) {
      this.logger.log(error, 'execute');
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }
}
