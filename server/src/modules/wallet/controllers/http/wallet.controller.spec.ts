import { InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { WalletController } from './wallet.controller';
import {
  CreateWalletCase,
  DeleteWalletCase,
  GetAllWalletsCase,
  GetWalletCase,
  UpdateWalletCase,
} from '../../use-cases';
import { Wallet } from '../../entities';

describe('WalletController', () => {
  let walletController: WalletController;
  let createWalletCase: { execute: jest.Mock };
  let deleteWalletCase: { execute: jest.Mock };
  let getAllWalletsCase: { execute: jest.Mock };
  let getWalletCase: { execute: jest.Mock };
  let updateWalletCase: { execute: jest.Mock };
  const walletId = '34960bcd-5892-45d4-bf4a-5ecc9b6df44e';
  const mockWallet: Wallet = {
    id: walletId,
    name: 'Default',
    balance: 0,
    created: new Date(),
    updated: new Date(),
    deleted: new Date(),
    transactions: [],
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: CreateWalletCase, useValue: { execute: jest.fn() } },
        { provide: DeleteWalletCase, useValue: { execute: jest.fn() } },
        { provide: GetAllWalletsCase, useValue: { execute: jest.fn() } },
        { provide: GetWalletCase, useValue: { execute: jest.fn() } },
        { provide: UpdateWalletCase, useValue: { execute: jest.fn() } },
      ],
      controllers: [WalletController],
    }).compile();

    createWalletCase = app.get(CreateWalletCase);
    deleteWalletCase = app.get(DeleteWalletCase);
    getAllWalletsCase = app.get(GetAllWalletsCase);
    getWalletCase = app.get(GetWalletCase);
    updateWalletCase = app.get(UpdateWalletCase);
    walletController = app.get<WalletController>(WalletController);
  });

  describe('createWallet', () => {
    it('should create a wallet successfully', async () => {
      const expected = { ...mockWallet };
      createWalletCase.execute.mockResolvedValue(expected);

      expect(await walletController.createWallet({})).toEqual(expected);
    });

    it('should throw a InternalServerErrorException if any error occours in the underline service', () => {
      const expected = new InternalServerErrorException();
      createWalletCase.execute.mockRejectedValue(expected);

      return expect(() => walletController.createWallet({})).rejects.toThrow(expected);
    });
  });

  describe('updateWallet', () => {
    it('should update a wallet successfully', async () => {
      const payload = { name: 'updatedWallet' };
      const expected = { ...mockWallet, ...payload };
      updateWalletCase.execute.mockResolvedValue(expected);

      expect(await walletController.updateWallet(walletId, payload)).toEqual(expected);
    });

    it('should throw a InternalServerErrorException if any error occours in the underline service', () => {
      const payload = { name: 'updatedWallet' };
      const expected = new InternalServerErrorException();
      updateWalletCase.execute.mockRejectedValue(expected);

      return expect(() => walletController.updateWallet(walletId, payload)).rejects.toThrow(expected);
    });
  });

  describe('deleteWallet', () => {
    it('should delete a wallet successfully', async () => {
      const payload = walletId;
      const expected = undefined;
      deleteWalletCase.execute.mockResolvedValue(expected);

      expect(await walletController.deleteWallet(payload)).toEqual(expected);
    });

    it('should throw a InternalServerErrorException if any error occours in the underline service', () => {
      const payload = walletId;
      const expected = new InternalServerErrorException();
      deleteWalletCase.execute.mockRejectedValue(expected);

      return expect(() => walletController.deleteWallet(payload)).rejects.toThrow(expected);
    });
  });

  describe('getWallet', () => {
    it('should retrieve a wallet successfully', async () => {
      const payload = walletId;
      const expected = { ...mockWallet };
      getWalletCase.execute.mockResolvedValue(expected);

      expect(await walletController.getWallet(payload)).toEqual(expected);
    });

    it('should throw a InternalServerErrorException if any error occours in the underline service', () => {
      const payload = walletId;
      const expected = new InternalServerErrorException();
      getWalletCase.execute.mockRejectedValue(expected);

      return expect(() => walletController.getWallet(payload)).rejects.toThrow(expected);
    });
  });

  describe('getWallets', () => {
    it('should retrieve a list of wallets successfully', async () => {
      const expected = [{ ...mockWallet }, { ...mockWallet, id: '2', name: 'Wallet 2' }];
      getAllWalletsCase.execute.mockResolvedValue(expected);

      expect(await walletController.getWallets()).toEqual(expected);
    });

    it('should throw a InternalServerErrorException if any error occours in the underline service', () => {
      const expected = new InternalServerErrorException();
      getAllWalletsCase.execute.mockRejectedValue(expected);

      return expect(() => walletController.getWallets()).rejects.toThrow(expected);
    });
  });
});
