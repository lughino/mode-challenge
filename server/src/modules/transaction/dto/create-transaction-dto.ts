import { IsNumber, Min, IsEnum } from 'class-validator';
import { TransactionType } from '../entities';

export class CreateTransactionDto {
  @Min(0.1)
  @IsNumber({ maxDecimalPlaces: 2, allowInfinity: false, allowNaN: false })
  amount!: number;

  @IsEnum(TransactionType)
  type!: TransactionType;
}
