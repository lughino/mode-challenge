import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { Operation } from '../../../app/Operation';
import { Wallet } from '../entities';
import { WalletService } from '../repositories/wallet.service';

@Injectable()
export class GetWalletCase implements Operation {
  private logger = new Logger('GetWalletCase');

  constructor(private readonly walletService: WalletService) {}

  public async execute(id: string): Promise<Wallet> {
    try {
      const wallet = await this.walletService.findById(id);
      if (typeof wallet === 'undefined') {
        throw new NotFoundException();
      }

      return wallet;
    } catch (error) {
      this.logger.log(error, 'execute');
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }
}
