import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TransactionController } from './transaction.controller';
import { CreateTransactionCase, GetAllTransactionsCase, GetTransactionCase } from '../../use-cases';
import { Transaction, TransactionType } from '../../entities';
import { Wallet } from '../../../wallet/entities';

describe('TransactionController', () => {
  let transactionController: TransactionController;
  let createTransactionCase: { execute: jest.Mock };
  let getAllTransactionsCase: { execute: jest.Mock };
  let getTransactionCase: { execute: jest.Mock };
  const mockWallet: Wallet = {
    id: '58580bcd-5892-45d4-bf4a-5ecc9b6da005j',
    name: 'Wallet 1',
    balance: 500,
    created: new Date(),
    updated: new Date(),
    transactions: [],
  };
  const transactionId = '34960bcd-5892-45d4-bf4a-5ecc9b6df44e';
  const mockTransaction: Transaction = {
    id: transactionId,
    amount: 30,
    date: new Date(),
    type: TransactionType.DEBIT,
    wallet: mockWallet,
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: CreateTransactionCase, useValue: { execute: jest.fn() } },
        { provide: GetAllTransactionsCase, useValue: { execute: jest.fn() } },
        { provide: GetTransactionCase, useValue: { execute: jest.fn() } },
      ],
      controllers: [TransactionController],
    }).compile();

    createTransactionCase = app.get(CreateTransactionCase);
    getAllTransactionsCase = app.get(GetAllTransactionsCase);
    getTransactionCase = app.get(GetTransactionCase);
    transactionController = app.get<TransactionController>(TransactionController);
  });

  describe('createTransaction', () => {
    it('should create a wallet successfully', async () => {
      const payload = { amount: 50, type: TransactionType.CREDIT };
      const expected = {
        ...mockTransaction,
        ...payload,
        wallet: { ...mockWallet, balance: mockWallet.balance + payload.amount },
      };
      createTransactionCase.execute.mockResolvedValue(expected);

      expect(await transactionController.createTransaction(mockWallet.id, payload)).toEqual(expected);
    });

    it('should throw a InternalServerErrorException if any error occours in the underline service', () => {
      const payload = { amount: 600, type: TransactionType.DEBIT };
      const expected = new BadRequestException('Insuffiecient balance');
      createTransactionCase.execute.mockRejectedValue(expected);

      return expect(() => transactionController.createTransaction(mockWallet.id, payload)).rejects.toThrow(expected);
    });
  });

  describe('getTransaction', () => {
    it('should retrieve a wallet successfully', async () => {
      const payload = transactionId;
      const expected = { ...mockTransaction };
      getTransactionCase.execute.mockResolvedValue(expected);

      expect(await transactionController.getTransaction(payload)).toEqual(expected);
    });

    it('should throw a InternalServerErrorException if any error occours in the underline service', () => {
      const payload = transactionId;
      const expected = new InternalServerErrorException();
      getTransactionCase.execute.mockRejectedValue(expected);

      return expect(() => transactionController.getTransaction(payload)).rejects.toThrow(expected);
    });
  });

  describe('getTransactions', () => {
    it('should retrieve a list of transactions per wallet successfully', async () => {
      const expected = [
        { ...mockTransaction, wallet: undefined },
        { ...mockTransaction, wallet: undefined, amount: 200, type: TransactionType.CREDIT },
      ];
      getAllTransactionsCase.execute.mockResolvedValue(expected);

      expect(await transactionController.getTransactions(mockWallet.id)).toEqual(expected);
    });

    it('should throw a InternalServerErrorException if any error occours in the underline service', () => {
      const expected = new InternalServerErrorException();
      getAllTransactionsCase.execute.mockRejectedValue(expected);

      return expect(() => transactionController.getTransactions(mockWallet.id)).rejects.toThrow(expected);
    });
  });
});
