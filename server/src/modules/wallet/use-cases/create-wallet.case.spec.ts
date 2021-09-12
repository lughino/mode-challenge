import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateWalletCase } from './create-wallet.case';
import { WalletService } from '../repositories';
import { Wallet } from '../entities';

describe('CreateWalletCase', () => {
  let createWalletCase: CreateWalletCase;
  const createRepository = jest.fn();
  const saveRepository = jest.fn();

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        WalletService,
        CreateWalletCase,
        { provide: getRepositoryToken(Wallet), useValue: { create: createRepository, save: saveRepository } },
      ],
    }).compile();

    createWalletCase = app.get<CreateWalletCase>(CreateWalletCase);
  });

  describe('execute', () => {
    const mockWallet: Wallet = {
      id: '34960bcd-5892-45d4-bf4a-5ecc9b6df44e',
      name: 'Default',
      balance: 0,
      created: new Date(),
      updated: new Date(),
      transactions: [],
    };

    it('should create a wallet successfully with default params', async () => {
      const payload = new Wallet();
      const expected = { ...mockWallet };
      createRepository.mockReturnValue(payload);
      saveRepository.mockResolvedValue(expected);

      expect(await createWalletCase.execute(payload)).toEqual(expected);
    });

    it('should create a wallet successfully with passed params', async () => {
      const payload = { name: 'walletTest' };
      const expected = { ...mockWallet, ...payload };
      const entity = new Wallet();
      entity.name = payload.name;
      createRepository.mockReturnValue(entity);
      saveRepository.mockResolvedValue(expected);

      expect(await createWalletCase.execute(payload)).toEqual(expected);
    });

    it('should throw a BadRequestException if wallet name already exists', () => {
      const payload = { name: 'walletTest' };
      const expected = new BadRequestException('Wallet already exists');
      const error = { errno: 19 };
      const entity = new Wallet();
      entity.name = payload.name;
      createRepository.mockReturnValue(entity);
      saveRepository.mockRejectedValue(error);

      return expect(() => createWalletCase.execute(payload)).rejects.toThrow(expected);
    });

    it('should throw a InternalServerErrorException if any error occours in the underline service', () => {
      const payload = { name: 'walletTest' };
      const expected = new InternalServerErrorException();
      const error = new Error();
      const entity = new Wallet();
      entity.name = payload.name;
      createRepository.mockReturnValue(entity);
      saveRepository.mockRejectedValue(error);

      return expect(() => createWalletCase.execute(payload)).rejects.toThrow(expected);
    });
  });
});
