/* eslint-disable @typescript-eslint/no-explicit-any */
import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { Operation } from '../../../app/Operation';
import { Wallet } from '../entities';
import { WalletService } from '../repositories/wallet.service';
import { CreateWalletDto } from '../dto/create-wallet-dto';

@Injectable()
export class CreateWalletCase implements Operation {
  private logger = new Logger('CreateWalletCase');

  constructor(private readonly walletService: WalletService) {}

  public async execute(walletDto: CreateWalletDto): Promise<Wallet> {
    try {
      const wallet = this.walletService.createEntity(walletDto);
      const newWallet = await this.walletService.create(wallet);

      return newWallet;
    } catch (error: any) {
      this.logger.log(error, 'execute');
      if (error.errno === 19) {
        throw new BadRequestException({ message: 'Wallet already exists' });
      }
      throw new InternalServerErrorException();
    }
  }
}
