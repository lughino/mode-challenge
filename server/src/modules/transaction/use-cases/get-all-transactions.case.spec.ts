import { InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { GetAllTransactionsCase } from './get-all-transactions.case';
import { TransactionService } from '../repositories';
import { Transaction, TransactionType } from '../entities';
import { Wallet } from '../../wallet/entities';

describe('GetAllTransactionsCase', () => {
  let getAllTransactionsCase: GetAllTransactionsCase;
  const findRepository = jest.fn();

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionService,
        GetAllTransactionsCase,
        { provide: getRepositoryToken(Transaction), useValue: { find: findRepository } },
      ],
    }).compile();

    getAllTransactionsCase = app.get<GetAllTransactionsCase>(GetAllTransactionsCase);
  });

  describe('execute', () => {
    const walletId = '56780bcd-5892-45d4-bf4a-5ecc9b6oj40n';
    const mockTransaction: Transaction = {
      id: '12340bcd-5892-45d4-bf4a-5ecc9b6wr55o',
      amount: 100,
      date: new Date(),
      wallet: new Wallet(),
      type: TransactionType.DEBIT,
    };

    it('should retrieve the transactions correctly', async () => {
      const expected: Transaction[] = [
        { ...mockTransaction },
        { ...mockTransaction, id: '23940djg-5892-89f3-bf4a-5ecc9b6df23p', amount: 200, type: TransactionType.CREDIT },
      ];
      findRepository.mockResolvedValue(expected);

      expect(await getAllTransactionsCase.execute(walletId)).toEqual(expected);
    });

    it('should throw a InternalServerErrorException if any error occours in the underline service', () => {
      const expected = new InternalServerErrorException();
      findRepository.mockRejectedValue(new Error());

      return expect(() => getAllTransactionsCase.execute(walletId)).rejects.toThrow(expected);
    });
  });
});
