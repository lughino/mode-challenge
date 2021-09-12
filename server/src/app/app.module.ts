import { Module } from '@nestjs/common';
import { TransactionModule, WalletModule } from '../modules';

@Module({
  imports: [TransactionModule, WalletModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
