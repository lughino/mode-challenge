import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { WalletController } from './controllers/http';
import { DatabaseModule } from '../../data-access';
import { WalletService } from './repositories';
import * as useCases from './use-cases';
import { Wallet } from './entities';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Wallet])],
  controllers: [WalletController],
  providers: [WalletService, ...Object.values(useCases)],
  exports: [WalletService],
})
export class WalletModule {}
