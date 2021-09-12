import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { Operation } from '../../../app/Operation';
import { WalletService } from '../repositories/wallet.service';

@Injectable()
export class DeleteWalletCase implements Operation {
  private logger = new Logger('DeleteWalletCase');

  constructor(private readonly walletService: WalletService) {}

  public async execute(id: string): Promise<void> {
    try {
      await this.walletService.delete(id);
    } catch (error) {
      this.logger.log(error, 'execute');
      throw new InternalServerErrorException();
    }
  }
}
