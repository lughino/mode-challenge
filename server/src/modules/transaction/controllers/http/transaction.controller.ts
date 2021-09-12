import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
  Logger,
  ParseUUIDPipe,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { Transaction } from '../../entities';
import { CreateTransactionDto } from '../../dto';
import { CreateTransactionCase, GetAllTransactionsCase, GetTransactionCase } from '../../use-cases';

@Controller('transaction')
export class TransactionController {
  private logger = new Logger('TransactionController');

  constructor(
    private createTransactionCase: CreateTransactionCase,
    private getTransactionCase: GetTransactionCase,
    private getAllTransactionsCase: GetAllTransactionsCase,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('wallet/:walletId')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async createTransaction(
    @Param('walletId', ParseUUIDPipe) walletId: string,
    @Body() transactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    try {
      const createdTransaction = await this.createTransactionCase.execute(walletId, transactionDto);

      return createdTransaction;
    } catch (error) {
      this.logger.log(error, 'createTransaction');

      throw error;
    }
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async getTransaction(@Param('id', ParseUUIDPipe) id: string): Promise<Transaction> {
    try {
      const transaction = await this.getTransactionCase.execute(id);

      return transaction;
    } catch (e) {
      this.logger.log(e, 'getTransaction');
      throw e;
    }
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('wallet/:walletId')
  async getTransactions(@Param('walletId', ParseUUIDPipe) walletId: string): Promise<Transaction[]> {
    try {
      const transactions = await this.getAllTransactionsCase.execute(walletId);

      return transactions;
    } catch (error) {
      this.logger.log(error, 'getTransactions');
      throw error;
    }
  }
}
