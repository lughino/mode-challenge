import { Injectable } from '@nestjs/common';
import { Operation } from '../../../app/operation';
import { Wallet } from '../entities';
import { WalletService } from '../repositories/wallet.service';

@Injectable()
export class CreateWallet implements Operation<Promise<Wallet>> {
  constructor(private readonly walletService: WalletService) {}

  public execute(): Promise<Wallet> {
    const newWallet = new Wallet();
    return this;
  }
}
