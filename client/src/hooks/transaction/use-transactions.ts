import axios from 'axios';
import { useQuery } from 'react-query';
import { Transaction } from '../../types';
import { API_URL } from '../../constants';

async function getTransactions(walletId: string): Promise<Transaction[]> {
  const { data } = await axios.get<Transaction[]>(`${API_URL}/transaction/wallet/${walletId}`);

  return data;
}

export function useTransactions(walletId: string) {
  return useQuery(['transactions', walletId], () => getTransactions(walletId));
}
