import { InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { GetAllWalletsCase } from './get-all-wallets.case';
import { WalletService } from '../repositories';
import { Wallet } from '../entities';

describe('GetAllWalletsCase', () => {
  let getAllWalletsCase: GetAllWalletsCase;
  const findRepository = jest.fn();

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        WalletService,
        GetAllWalletsCase,
        { provide: getRepositoryToken(Wallet), useValue: { find: findRepository } },
      ],
    }).compile();

    getAllWalletsCase = app.get<GetAllWalletsCase>(GetAllWalletsCase);
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

    it('should retrieve the wallets correctly', async () => {
      const expected = [
        { ...mockWallet },
        { ...mockWallet, id: '23940djg-5892-89f3-bf4a-5ecc9b6df23p', name: 'walletNameTest', balance: 100 },
      ];
      findRepository.mockResolvedValue(expected);

      expect(await getAllWalletsCase.execute()).toEqual(expected);
    });

    it('should throw a InternalServerErrorException if any error occours in the underline service', () => {
      const expected = new InternalServerErrorException();
      findRepository.mockRejectedValue(new Error());

      return expect(() => getAllWalletsCase.execute()).rejects.toThrow(expected);
    });
  });
});
