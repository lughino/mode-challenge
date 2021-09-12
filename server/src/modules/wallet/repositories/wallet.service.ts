import { Injectable } from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ModuleRef } from '@nestjs/core';
import { TransactionFor } from 'nest-transact';
import { Wallet } from '../entities';
import { CreateWalletDto } from '../dto/create-wallet-dto';

@Injectable()
export class WalletService extends TransactionFor<WalletService> {
  constructor(
    @InjectRepository(Wallet)
    private walletRepository: Repository<Wallet>,
    moduleRef: ModuleRef,
  ) {
    super(moduleRef);
  }

  async findAll(): Promise<Wallet[]> {
    return this.walletRepository.find();
  }

  async findById(id: string): Promise<Wallet | undefined> {
    return this.walletRepository.findOne(id);
  }

  async create(wallet: Wallet): Promise<Wallet> {
    return this.walletRepository.save(wallet);
  }

  createEntity(wallet: CreateWalletDto): Wallet {
    return this.walletRepository.create(wallet);
  }

  async delete(id: string): Promise<void> {
    await this.walletRepository.softDelete(id);
  }

  async update(id: string, wallet: Wallet): Promise<UpdateResult> {
    return this.walletRepository.update(id, wallet);
  }
}
