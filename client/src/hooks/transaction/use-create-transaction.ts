import axios, { AxiosError } from 'axios';
import { useMutation, UseMutationOptions } from 'react-query';
import { TransactionDto, Transaction } from '../../types/index';

const API_URL = 'http://localhost:3000';

export async function createTransaction(walletId: string, transactionDto: TransactionDto): Promise<Transaction> {
  const { data } = await axios.post<Transaction>(`${API_URL}/transaction/wallet/${walletId}`, transactionDto);

  return data;
}

export function useCreateTransaction<T>(
  rqOptions: UseMutationOptions<Transaction, AxiosError, { walletId: string; transactionDto: TransactionDto }, T> = {},
) {
  return useMutation<Transaction, AxiosError, { walletId: string; transactionDto: TransactionDto }, T>(
    ({ walletId, transactionDto }) => createTransaction(walletId, transactionDto),
    rqOptions,
  );
}
