import { InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeleteWalletCase } from './delete-wallet.case';
import { WalletService } from '../repositories';
import { Wallet } from '../entities';

describe('DeleteWalletCase', () => {
  let deleteWalletCase: DeleteWalletCase;
  const softDeleteRepository = jest.fn();

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        WalletService,
        DeleteWalletCase,
        { provide: getRepositoryToken(Wallet), useValue: { softDelete: softDeleteRepository } },
      ],
    }).compile();

    deleteWalletCase = app.get<DeleteWalletCase>(DeleteWalletCase);
  });

  describe('execute', () => {
    const walletId = '34960bcd-5892-45d4-bf4a-5ecc9b6df44e';

    it('should delete the wallet correctly', async () => {
      const payload = walletId;
      const expected = undefined;
      softDeleteRepository.mockResolvedValue(expected);

      expect(await deleteWalletCase.execute(payload)).toEqual(expected);
    });

    it('should throw a InternalServerErrorException if any error occours in the underline service', () => {
      const payload = walletId;
      const expected = new InternalServerErrorException();
      softDeleteRepository.mockRejectedValue(new Error());

      return expect(() => deleteWalletCase.execute(payload)).rejects.toThrow(expected);
    });
  });
});
