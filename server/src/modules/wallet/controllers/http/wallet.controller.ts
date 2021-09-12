import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
  Logger,
  Delete,
  ParseUUIDPipe,
  Patch,
  HttpCode,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { Wallet } from '../../entities';
import { CreateWalletDto, UpdateWalletDto } from '../../dto';
import {
  CreateWalletCase,
  DeleteWalletCase,
  GetAllWalletsCase,
  GetWalletCase,
  UpdateWalletCase,
  UpdateWalletUseCaseResult,
} from '../../use-cases';

@Controller('wallet')
export class WalletController {
  private logger = new Logger('WalletController');

  constructor(
    private createWalletCase: CreateWalletCase,
    private deleteWalletCase: DeleteWalletCase,
    private getWalletCase: GetWalletCase,
    private getAllWalletsCase: GetAllWalletsCase,
    private updateWalletCase: UpdateWalletCase,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async createWallet(@Body() wallet: CreateWalletDto): Promise<Wallet> {
    try {
      const createdWallet = await this.createWalletCase.execute(wallet);

      return createdWallet;
    } catch (error) {
      this.logger.log(error, 'createWallet');
      // NOTE: Used http exception errors in inner domain for sake of time. In real world scenario, those errors should be differentiated depending to the transport. (e.g. use cases are agnostic application specifica business rules. They are not aware of any trasport layer)
      throw error;
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteWallet(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    try {
      await this.deleteWalletCase.execute(id);
    } catch (e) {
      this.logger.log(e, 'deleteWallet');
      throw e;
    }
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async getWallet(@Param('id', ParseUUIDPipe) id: string): Promise<Wallet> {
    try {
      const wallet = await this.getWalletCase.execute(id);

      return wallet;
    } catch (e) {
      this.logger.log(e, 'getWallet');
      throw e;
    }
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async getWallets(): Promise<Wallet[]> {
    try {
      const wallets = await this.getAllWalletsCase.execute();

      return wallets;
    } catch (error) {
      this.logger.log(error, 'getWallets');
      throw error;
    }
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async updateWallet(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() wallet: UpdateWalletDto,
  ): Promise<UpdateWalletUseCaseResult> {
    try {
      const updateRes = await this.updateWalletCase.execute(id, wallet);

      return updateRes;
    } catch (error) {
      this.logger.log(error, 'updateWallet');
      throw error;
    }
  }
}
