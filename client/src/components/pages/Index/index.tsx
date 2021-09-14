import React from 'react';
import { useTransactions, useWallet, UIProvider } from '../../../hooks';
import { Wallet } from '../../../types';
import { PageLayout } from '../../atoms/PageLayout';
import { MyAccount } from '../../templates/MyAccount';
import { SendMoney } from '../../templates/SendMoney';
import { walletId } from '../../../constants';

export const Index: React.FunctionComponent = () => {
  const { data: wallet } = useWallet(walletId);
  const { data: transactions } = useTransactions(walletId);

  return (
    <UIProvider>
      <PageLayout>
        <SendMoney wallet={wallet || ({} as Wallet)} />
        <MyAccount balance={(wallet && wallet.balance) || 0} transactions={transactions || []} />
      </PageLayout>
    </UIProvider>
  );
};
