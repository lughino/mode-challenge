import React from 'react';
import styled from 'styled-components';
import { media } from '../../../theme';
import { Button } from '../../atoms/Button';
import { Column } from '../../atoms/Column';
import { Title } from '../../atoms/Title';
import { Dashboard } from '../../molecules/Dashboard';
import { TransactionList } from '../../organisms/TransactionList';
import { calculateTotalSent } from '../../../utils';
import { Transaction } from '../../../types';

export interface MyAccountProps {
  transactions: Transaction[];
  balance: number;
}

const Int = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SendMoneyButton = styled(Button)`
  display: none;
  @media (max-width: ${media.maxPhone}) {
    display: block;
    border-radius: 4px;
    position: absolute;
    top: 94px;
    left: -30px;
    transform: rotate(90deg);
    padding: 4px;
    font-size: 12px;

    &:active {
      transform: rotate(90deg);
    }
  }
`;

export const MyAccount: React.FunctionComponent<MyAccountProps> = ({ transactions, balance }) => {
  const handleOpenSendMoneyForm = () => undefined;

  return (
    <Column>
      <SendMoneyButton onClick={handleOpenSendMoneyForm}>Send Money</SendMoneyButton>
      <Title>My account</Title>
      <Int>
        <Dashboard leftAvailable={balance} totalSent={calculateTotalSent(transactions || [])} />
        <TransactionList transactions={transactions || []} />
      </Int>
    </Column>
  );
};
