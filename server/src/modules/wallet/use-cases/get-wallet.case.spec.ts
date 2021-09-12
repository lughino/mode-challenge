import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { GetWalletCase } from './get-wallet.case';
import { WalletService } from '../repositories';
import { Wallet } from '../entities';

describe('GetWalletCase', () => {
  let getWalletCase: GetWalletCase;
  const findOneRepository = jest.fn();

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        WalletService,
        GetWalletCase,
        { provide: getRepositoryToken(Wallet), useValue: { findOne: findOneRepository } },
      ],
    }).compile();

    getWalletCase = app.get<GetWalletCase>(GetWalletCase);
  });

  describe('execute', () => {
    const walletId = '34960bcd-5892-45d4-bf4a-5ecc9b6df44e';
    const mockWallet: Wallet = {
      id: walletId,
      name: 'Default',
      balance: 0,
      created: new Date(),
      updated: new Date(),
      transactions: [],
    };

    it('should retrieve the wallet correctly', async () => {
      const payload = walletId;
      const expected = { ...mockWallet };
      findOneRepository.mockResolvedValue(expected);

      expect(await getWalletCase.execute(payload)).toEqual(expected);
    });

    it('should throw a NotFoundException if no wallet has been found', () => {
      const payload = 'wrongWalletId';
      const expected = new NotFoundException();
      findOneRepository.mockResolvedValue(undefined);

      return expect(() => getWalletCase.execute(payload)).rejects.toThrow(expected);
    });

    it('should throw a InternalServerErrorException if any error occours in the underline service', () => {
      const payload = walletId;
      const expected = new InternalServerErrorException();
      findOneRepository.mockRejectedValue(new Error());

      return expect(() => getWalletCase.execute(payload)).rejects.toThrow(expected);
    });
  });
});
