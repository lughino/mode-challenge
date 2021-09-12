import { Connection } from 'typeorm';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Operation } from '../../../app/Operation';
import { Transaction, TransactionType } from '../entities';
import { CreateTransactionDto } from '../dto/create-transaction-dto';
import { TransactionService } from '../repositories';
import { WalletService } from '../../wallet/repositories';

@Injectable()
export class CreateTransactionCase implements Operation {
  private logger = new Logger('CreateTransactionCase');

  constructor(
    private readonly transactionService: TransactionService,
    private readonly walletService: WalletService,
    private connection: Connection,
  ) {}

  public async execute(walletId: string, transactionDto: CreateTransactionDto): Promise<Transaction> {
    return this.connection.transaction(async (manager) => {
      try {
        const wallet = await this.walletService.withTransaction(manager).findById(walletId);
        if (!wallet) {
          throw new NotFoundException(`Wallet with id ${walletId} not found`);
        }
        if (transactionDto.type === TransactionType.DEBIT && transactionDto.amount > wallet.balance) {
          throw new BadRequestException('Insufficient balance');
        }
        const transactionToSave = this.transactionService.createEntity(transactionDto);
        transactionToSave.wallet = wallet;

        const transaction = await this.transactionService.withTransaction(manager).create(transactionToSave);
        wallet.balance =
          transaction.type === TransactionType.DEBIT
            ? wallet.balance - transaction.amount
            : wallet.balance + transaction.amount;

        await this.walletService.withTransaction(manager).update(walletId, wallet);

        return transaction;
      } catch (error) {
        this.logger.log(error, 'execute');
        if (error instanceof NotFoundException || error instanceof BadRequestException) {
          throw error;
        }
        throw new InternalServerErrorException();
      }
    });
  }
}
