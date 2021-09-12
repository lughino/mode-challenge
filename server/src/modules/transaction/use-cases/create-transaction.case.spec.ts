/* eslint-disable @typescript-eslint/no-unsafe-return */
import { BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { CreateTransactionCase } from './create-transaction.case';
import { TransactionService } from '../repositories';
import { Transaction, TransactionType } from '../entities';
import { Wallet } from '../../wallet/entities';
import { WalletService } from '../../wallet/repositories';

describe('CreateTransactionCase', () => {
  let createTransactionCase: CreateTransactionCase;
  const mockTransactionRepository = {
    create: jest.fn(),
    save: jest.fn(),
  };
  const mockWalletRepository = {
    findOne: jest.fn(),
    update: jest.fn(),
  };
  const entityManager: { transaction: jest.Mock; getCustomRepository: jest.Mock } = {
    transaction: jest.fn((cb) => cb(entityManager)),
    getCustomRepository: jest.fn(),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionService,
        CreateTransactionCase,
        WalletService,
        {
          provide: Connection,
          useValue: entityManager,
        },
        {
          provide: getRepositoryToken(Transaction),
          useValue: mockTransactionRepository,
        },
        {
          provide: getRepositoryToken(Wallet),
          useValue: mockWalletRepository,
        },
      ],
    }).compile();

    createTransactionCase = app.get<CreateTransactionCase>(CreateTransactionCase);

    entityManager.getCustomRepository
      .mockReturnValueOnce(mockWalletRepository)
      .mockReturnValueOnce(mockTransactionRepository)
      .mockReturnValueOnce(mockWalletRepository);
  });

  describe('execute', () => {
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

    it.only('should create a transaction successfully in "credit"', async () => {
      const payload = { amount: 50, type: TransactionType.CREDIT };
      const expected = {
        ...mockTransaction,
        ...payload,
        wallet: { ...mockWallet, balance: mockWallet.balance + payload.amount },
      };
      mockTransactionRepository.create.mockReturnValue(payload);
      mockTransactionRepository.save.mockResolvedValue(expected);
      mockWalletRepository.findOne.mockResolvedValue(mockWallet);

      expect(await createTransactionCase.execute(mockWallet.id, payload)).toEqual(expected);
    });

    it('should create a transaction successfully in "debit"', async () => {
      const payload = { amount: 50, type: TransactionType.DEBIT };
      const expected = {
        ...mockTransaction,
        ...payload,
        wallet: { ...mockWallet, balance: mockWallet.balance - payload.amount },
      };
      const entity = new Transaction();
      Object.assign(entity, payload);
      mockTransactionRepository.create.mockReturnValue(entity);
      mockTransactionRepository.save.mockResolvedValue(expected);
      mockWalletRepository.findOne.mockResolvedValue(mockWallet);

      expect(await createTransactionCase.execute(mockWallet.id, payload)).toEqual(expected);
    });

    it('should throw a BadRequestException if wallet does not have enough balance and the transaction is of type "debit"', () => {
      const payload = { amount: 600, type: TransactionType.DEBIT };
      const expected = new BadRequestException('Insuffiecient balance');
      const entity = new Transaction();
      Object.assign(entity, payload);
      mockTransactionRepository.create.mockReturnValue(entity);
      mockWalletRepository.findOne.mockResolvedValue(mockWallet);

      return expect(() => createTransactionCase.execute(mockWallet.id, payload)).rejects.toThrow(expected);
    });

    it('should throw a NotFoundException if wallet does not exists', () => {
      const payload = { amount: 600, type: TransactionType.DEBIT };
      const expected = new NotFoundException(`Wallet with id ${mockWallet.id} not found`);
      mockWalletRepository.findOne.mockResolvedValue(undefined);

      return expect(() => createTransactionCase.execute(mockWallet.id, payload)).rejects.toThrow(expected);
    });

    it('should throw a InternalServerErrorException if any error occours in the underline service', () => {
      const payload = { amount: 600, type: TransactionType.DEBIT };
      const expected = new InternalServerErrorException();
      const error = new Error();
      mockWalletRepository.findOne.mockResolvedValue(error);

      return expect(() => createTransactionCase.execute(mockWallet.id, payload)).rejects.toThrow(expected);
    });
  });
});
