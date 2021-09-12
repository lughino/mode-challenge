import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { Operation } from '../../../app/Operation';
import { WalletService } from '../repositories';
import { UpdateWalletDto } from '../dto';

export interface UpdateWalletUseCaseResult {
  id: string;
  // affected: number;
}

@Injectable()
export class UpdateWalletCase implements Operation {
  private logger = new Logger('UpdateWalletCase');

  constructor(private readonly walletService: WalletService) {}

  public async execute(id: string, walletDto: UpdateWalletDto): Promise<UpdateWalletUseCaseResult> {
    try {
      const wallet = this.walletService.createEntity(walletDto);
      const res = await this.walletService.update(id, wallet);
      this.logger.log(res, 'update result');

      return { id };
    } catch (error) {
      this.logger.log(error, 'execute');
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }
}
