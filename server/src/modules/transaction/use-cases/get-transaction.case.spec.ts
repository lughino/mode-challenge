import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { GetTransactionCase } from './get-transaction.case';
import { TransactionService } from '../repositories';
import { Transaction, TransactionType } from '../entities';
import { Wallet } from '../../wallet/entities';

describe('GetTransactionCase', () => {
  let getTransactionCase: GetTransactionCase;
  const findOneRepository = jest.fn();

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionService,
        GetTransactionCase,
        { provide: getRepositoryToken(Transaction), useValue: { findOne: findOneRepository } },
      ],
    }).compile();

    getTransactionCase = app.get<GetTransactionCase>(GetTransactionCase);
  });

  describe('execute', () => {
    const transactionId = '34960bcd-5892-45d4-bf4a-5ecc9b6df44e';
    const mockTransaction: Transaction = {
      id: transactionId,
      amount: 30,
      date: new Date(),
      type: TransactionType.DEBIT,
      wallet: new Wallet(),
    };

    it('should retrieve the wallet correctly', async () => {
      const payload = transactionId;
      const expected = { ...mockTransaction };
      findOneRepository.mockResolvedValue(expected);

      expect(await getTransactionCase.execute(payload)).toEqual(expected);
    });

    it('should throw a NotFoundException if no wallet has been found', () => {
      const payload = 'wrongTransactionId';
      const expected = new NotFoundException();
      findOneRepository.mockResolvedValue(undefined);

      return expect(() => getTransactionCase.execute(payload)).rejects.toThrow(expected);
    });

    it('should throw a InternalServerErrorException if any error occours in the underline service', () => {
      const payload = transactionId;
      const expected = new InternalServerErrorException();
      findOneRepository.mockRejectedValue(new Error());

      return expect(() => getTransactionCase.execute(payload)).rejects.toThrow(expected);
    });
  });
});
