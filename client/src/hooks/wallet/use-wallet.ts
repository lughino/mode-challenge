import axios from 'axios';
import { useQuery } from 'react-query';
import { Wallet } from '../../types';

const API_URL = 'http://localhost:3000';

async function getWallet(walletId: string): Promise<Wallet> {
  const { data } = await axios.get<Wallet>(`${API_URL}/wallet/${walletId}`);

  return data;
}

export function useWallet(walletId: string) {
  return useQuery(['wallet', walletId], () => getWallet(walletId));
}
