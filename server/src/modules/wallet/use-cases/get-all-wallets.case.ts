import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { Operation } from '../../../app/Operation';
import { Wallet } from '../entities';
import { WalletService } from '../repositories/wallet.service';

@Injectable()
export class GetAllWalletsCase implements Operation {
  private logger = new Logger('GetAllWalletsCase');

  constructor(private readonly walletService: WalletService) {}

  public async execute(): Promise<Wallet[]> {
    try {
      const wallets = await this.walletService.findAll();

      return wallets;
    } catch (error) {
      this.logger.log(error, 'execute');
      throw new InternalServerErrorException();
    }
  }
}
