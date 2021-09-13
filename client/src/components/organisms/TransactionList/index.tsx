import React from 'react';
import styled from 'styled-components';
import { SubTitle } from '../../atoms/SubTitle';
import { TransactionItem } from '../../molecules/TransactionItem';
import { Transaction } from '../../../types';
import { media } from '../../../theme';

export interface TransactionListProps {
  transactions: Transaction[];
}

const Wrapper = styled.div`
  width: 100%;
`;
const List = styled.div`
  overflow-y: scroll;

  @media (min-width: ${media.maxPhone}) {
    max-height: 55vh;
    box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;
  }
`;
const NoItem = styled.div``;

const handleList = ({ ...props }: Transaction) => <TransactionItem key={`transaction-${props.id}`} {...props} />;

export const TransactionList: React.FunctionComponent<TransactionListProps> = ({ transactions }) => (
  <Wrapper>
    <SubTitle>Transactions</SubTitle>
    {transactions.length ? <List>{transactions.map(handleList)}</List> : <NoItem>No transactions yet!</NoItem>}
  </Wrapper>
);
