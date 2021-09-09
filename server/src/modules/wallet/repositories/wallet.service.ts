import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { WALLET_REPOSITORY } from './wallet.provider';
import { Wallet } from '../entities';

@Injectable()
export class WalletService {
  constructor(
    @Inject(WALLET_REPOSITORY)
    private walletRepository: Repository<Wallet>,
  ) {}

  async findAll(): Promise<Wallet[]> {
    return this.walletRepository.find();
  }
}
