import { UpdateResult } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { WalletService } from '.';
import { Wallet } from '../entities';

describe('WalletService', () => {
  let walletService: WalletService;
  const findOneRepository = jest.fn();
  const findRepository = jest.fn();
  const createRepository = jest.fn();
  const saveRepository = jest.fn();
  const updateRepository = jest.fn();
  const softDeleteRepository = jest.fn();
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
        WalletService,
        {
          provide: getRepositoryToken(Wallet),
          useValue: {
            findOne: findOneRepository,
            find: findRepository,
            save: saveRepository,
            update: updateRepository,
            softDelete: softDeleteRepository,
            create: createRepository,
          },
        },
      ],
    }).compile();

    walletService = app.get<WalletService>(WalletService);
  });

  describe('createEntity', () => {
    it('should generate a wallet instance from a walletDto correctly', () => {
      const payload = { name: 'testWallet' };
      const expected = new Wallet();
      expected.name = payload.name;
      createRepository.mockReturnValue(expected);

      expect(walletService.createEntity(payload)).toEqual(expected);
    });
  });

  describe('create', () => {
    it('should save a wallet correctly', async () => {
      const payload = new Wallet();
      const expected = mockWallet;
      saveRepository.mockResolvedValue(expected);

      expect(await walletService.create(payload)).toEqual(expected);
    });
  });

  describe('findAll', () => {
    it('should retrieve list of wallets correctly', async () => {
      const expected = [
        { ...mockWallet },
        { ...mockWallet, id: 'testIdWallet', name: 'testWallet' },
        { ...mockWallet, id: 'testIdWallet2', name: 'testWallet2' },
      ];
      findRepository.mockResolvedValue(expected);

      expect(await walletService.findAll()).toEqual(expected);
    });
  });

  describe('find', () => {
    it('should retrieve wallet correctly', async () => {
      const payload = walletId;
      const expected = { ...mockWallet };
      findOneRepository.mockResolvedValue(expected);

      expect(await walletService.findById(payload)).toEqual(expected);
    });

    it('should return undefined when wallet not found', async () => {
      const payload = 'wrongId';
      const expected = undefined;
      findOneRepository.mockResolvedValue(expected);

      expect(await walletService.findById(payload)).toEqual(expected);
    });
  });

  describe('delete', () => {
    it('should delete wallet correctly', async () => {
      const payload = walletId;
      const expected = undefined;
      softDeleteRepository.mockResolvedValue(expected);

      expect(await walletService.delete(payload)).toEqual(expected);
    });
  });

  describe('update', () => {
    it('should update wallet correctly', async () => {
      const payload = new Wallet();
      payload.name = 'walletNameUpdated';
      const expected: UpdateResult = { raw: {}, generatedMaps: [], affected: 1 };
      updateRepository.mockResolvedValue(expected);

      expect(await walletService.update(walletId, payload)).toEqual(expected);
    });
  });
});
