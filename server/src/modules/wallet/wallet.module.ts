import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../data-access';
import { walletProviders } from './repositories/wallet.provider';
import { WalletService } from './repositories/wallet.service';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [...walletProviders, WalletService],
})
export class WalletModule {}
