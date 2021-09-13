import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useQueryClient } from 'react-query';
// eslint-disable-next-line no-restricted-imports
import { v4 as uuid } from 'uuid';
import { media } from '../../../theme';
import { Column } from '../../atoms/Column';
import { Title } from '../../atoms/Title';
import { SendMoneyForm } from '../../organisms/SendMoneyForm';
import { useCreateTransaction } from '../../../hooks';
import { TransactionDto, Wallet, Transaction } from '../../../types';

export interface SendMoneyProps {
  wallet: Wallet;
}

const slideInLeft = keyframes`
  from {
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
    visibility: visible;
  }

  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
`;

const slideOutLeft = keyframes`
  from {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  to {
    visibility: hidden;
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
  }
`;

const MediaColumn = styled(Column)`
  background-color: #ffffff;
  @media (max-width: ${media.maxPhone}) {
    position: absolute;
    bottom: 0;
    top: 0;
    margin: 24px 0;
    z-index: 1;
    &.col-open {
      animation: ${slideInLeft} 0.3s forwards;
    }
    &.col-closed {
      animation: ${slideOutLeft} 0.3s forwards;
    }
  }
`;
// TODO: create context to handle form in mobile : sendMoneyFormStatus ("open" or "close"); closeSendMoneyForm
export const SendMoney: React.FunctionComponent<SendMoneyProps> = ({ wallet = {} }) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useCreateTransaction<{ optimisticTransaction: Transaction }>({
    onMutate: async (variables) => {
      await queryClient.cancelQueries('transactions');

      const optimisticTransaction: Transaction = {
        id: uuid(),
        amount: variables.transactionDto.amount,
        date: new Date(),
        type: variables.transactionDto.type,
      };

      queryClient.setQueryData<Transaction[]>(['transactions', wallet.id], (old): Transaction[] => [
        optimisticTransaction,
        ...old!,
      ]);

      return { optimisticTransaction };
    },
    onSuccess: (result, variables, context) => {
      queryClient.setQueryData<Transaction[]>(['transactions', wallet.id], (old) =>
        old!.map((transaction) => (transaction.id === context?.optimisticTransaction.id ? result : transaction)),
      );
    },
  });

  const handleSubmit = (transactionDto: TransactionDto) => {
    mutate({ walletId: wallet.id, transactionDto });
  };

  const handleCancel = () => {
    console.log('cancel');
  };

  return (
    <MediaColumn className="col-open">
      <Title>Send Money</Title>
      <SendMoneyForm
        amountLeft={wallet.balance}
        isSubmitting={isLoading}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </MediaColumn>
  );
};
