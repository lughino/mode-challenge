import { InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UpdateWalletCase } from './update-wallet.case';
import { WalletService } from '../repositories';
import { Wallet } from '../entities';

describe('UpdateWalletCase', () => {
  let updateWalletCase: UpdateWalletCase;
  const createRepository = jest.fn();
  const updateRepository = jest.fn();

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        WalletService,
        UpdateWalletCase,
        { provide: getRepositoryToken(Wallet), useValue: { create: createRepository, update: updateRepository } },
      ],
    }).compile();

    updateWalletCase = app.get<UpdateWalletCase>(UpdateWalletCase);
  });

  describe('execute', () => {
    const walletId = '34960bcd-5892-45d4-bf4a-5ecc9b6df44e';

    it('should update a wallet successfully', async () => {
      const payload = new Wallet();
      const expected = { id: walletId };
      createRepository.mockReturnValue(payload);
      updateRepository.mockResolvedValue(expected);

      expect(await updateWalletCase.execute(walletId, payload)).toEqual(expected);
    });

    it('should throw a InternalServerErrorException if any error occours in the underline service', () => {
      const payload = { name: 'walletTest' };
      const expected = new InternalServerErrorException();
      const error = new Error();
      const entity = new Wallet();
      entity.name = payload.name;
      createRepository.mockReturnValue(entity);
      updateRepository.mockRejectedValue(error);

      return expect(() => updateWalletCase.execute(walletId, payload)).rejects.toThrow(expected);
    });
  });
});
