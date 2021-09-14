import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useQueryClient } from 'react-query';
// eslint-disable-next-line no-restricted-imports
import { v4 as uuid } from 'uuid';
import { media } from '../../../theme';
import { Column } from '../../atoms/Column';
import { Title } from '../../atoms/Title';
import { SendMoneyForm } from '../../organisms/SendMoneyForm';
import { useCreateTransaction, useUiContext } from '../../../hooks';
import { TransactionDto, Wallet, Transaction, TransactionType } from '../../../types';

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
  @media (max-width: ${media.maxPhone}) {
    background-color: #ffffff;
    position: fixed;
    bottom: 0;
    top: 0;
    z-index: 1;
    &.col-open {
      animation: ${slideInLeft} 0.3s forwards;
    }
    &.col-closed {
      animation: ${slideOutLeft} 0.3s forwards;
    }
    padding: 24px 4%;
  }
`;

export const SendMoney: React.FunctionComponent<SendMoneyProps> = ({ wallet }) => {
  const { modalStatus, toggleModal } = useUiContext();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useCreateTransaction<{ optimisticTransaction: Transaction; newBalance: number }>({
    onMutate: async (variables) => {
      await queryClient.cancelQueries('transactions');

      const optimisticTransaction: Transaction = {
        id: uuid(),
        amount: variables.transactionDto.amount,
        date: new Date(),
        type: variables.transactionDto.type,
      };

      queryClient.setQueryData<Transaction[]>(['transactions', wallet.id], (old = []): Transaction[] => [
        optimisticTransaction,
        ...old,
      ]);
      const newBalance =
        optimisticTransaction.type === TransactionType.DEBIT
          ? wallet.balance - optimisticTransaction.amount
          : wallet.balance + optimisticTransaction.amount;
      queryClient.setQueryData<Wallet>(
        ['wallet', wallet.id],
        (oldWallet = {} as Wallet): Wallet => ({
          ...oldWallet,
          balance: newBalance,
        }),
      );

      return { optimisticTransaction, newBalance };
    },
    onSuccess: (result, variables, context) => {
      queryClient.setQueryData<Transaction[]>(['transactions', wallet.id], (old = []) =>
        old.map((transaction) => (transaction.id === context?.optimisticTransaction.id ? result : transaction)),
      );
      queryClient.setQueryData<Wallet>(['wallet', wallet.id], (oldWallet = {} as Wallet) => ({
        ...oldWallet,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        balance: (result as any).wallet.balance,
      }));
      toggleModal();
    },
  });

  const handleSubmit = (transactionDto: TransactionDto) => {
    mutate({ walletId: wallet.id, transactionDto });
  };

  const handleCancel = () => {
    toggleModal();
  };

  return (
    <MediaColumn className={`col-${modalStatus}`}>
      <Title>Send Money</Title>
      <SendMoneyForm
        amountLeft={wallet.balance || 0}
        isSubmitting={isLoading}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </MediaColumn>
  );
};
