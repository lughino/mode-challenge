import React from 'react';
import { useTransactions, useWallet, UIProvider } from '../../../hooks';
import { Wallet } from '../../../types';
import { PageLayout } from '../../atoms/PageLayout';
import { MyAccount } from '../../templates/MyAccount';
import { SendMoney } from '../../templates/SendMoney';

// TODO: remove this hardcoded wallet if possible to create a page for creating wallets and user persona
const walletId = 'd2d73fa5-b569-4e9c-b4af-25f67567f984';

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
