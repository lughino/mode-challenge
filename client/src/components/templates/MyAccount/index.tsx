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
import { useUiContext } from '../../../hooks';

export interface MyAccountProps {
  transactions: Transaction[];
  balance: number;
}

const Int = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SendMoneyButtonWrap = styled.div`
  display: none;
  @media (max-width: ${media.maxPhone}) {
    display: block;
    position: fixed;
    left: 0px;
    width: 100%;
    right: 0px;
    bottom: 0px;
    padding: 4px;
    background-color: #fff;
  }
`;

const MyAccountColumn = styled(Column)`
  @media (max-width: ${media.maxPhone}) {
    margin-bottom: 52px;
  }
`;

export const MyAccount: React.FunctionComponent<MyAccountProps> = ({ transactions, balance }) => {
  const { toggleModal } = useUiContext();
  const handleOpenSendMoneyForm = () => toggleModal();

  return (
    <>
      <MyAccountColumn>
        <Title>My account</Title>
        <Int>
          <Dashboard leftAvailable={balance} totalSent={calculateTotalSent(transactions || [])} />
          <TransactionList transactions={transactions || []} />
        </Int>
      </MyAccountColumn>
      <SendMoneyButtonWrap>
        <Button fullWidth onClick={handleOpenSendMoneyForm}>
          Send Money
        </Button>
      </SendMoneyButtonWrap>
    </>
  );
};
