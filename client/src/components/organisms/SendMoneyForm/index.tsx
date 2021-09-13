/* eslint-disable @typescript-eslint/no-unsafe-return */
import React, { ChangeEvent, FormEvent, FunctionComponent } from 'react';
import styled from 'styled-components';
import validate from 'validate.js';
import { media } from '../../../theme';
import { currencyFormatter } from '../../../utils';
import { Button } from '../../atoms/Button';
import { Input } from '../../atoms/Input';
import { Radio } from '../../atoms/Radio';
import { RadioGroup } from '../../atoms/RadioGroup';
import { TransactionDto, TransactionType } from '../../../types';

export interface SendMoneyFormProps {
  /**
   * The amount left
   */
  amountLeft: number;
  /**
   * The form is sending the transaction
   */
  isSubmitting?: boolean;
  /**
   * On Submit callback
   */
  onSubmit(transaction: TransactionDto): void;
  /**
   * On Cancel callback
   */
  onCancel?(): void;
}

export interface SendMoneyFormState {
  errors: Record<string, string>;
  hasErrors: boolean;
  transaction: TransactionDto;
}

const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  flex-grow: 1;
  height: 100%;
`;

const InputList = styled.div`
  flex: 2;
`;

const CancelButton = styled(Button)`
  display: none;
  @media (max-width: ${media.maxPhone}) {
    margin-top: 24px;
    display: block;
  }
`;

const getValidationConstraints = (amountLeft: number, type: TransactionType): Record<string, unknown> => ({
  amount: {
    presence: true,
    numericality: {
      greaterThan: 0,
      lessThanOrEqualTo: type === TransactionType.DEBIT ? amountLeft : undefined,
      notGreaterThan: 'Please enter an amount greater than 0',
      notLessThanOrEqualTo: `Please enter an amount less then or equal to ${currencyFormatter(amountLeft)}`,
      notValid: 'Please enter a valid amount',
      strict: true,
    },
  },
  type: {
    presence: true,
    format: {
      pattern: /^(debit|credit)$/,
    },
  },
});

export const SendMoneyForm: FunctionComponent<SendMoneyFormProps> = ({
  amountLeft,
  isSubmitting,
  onSubmit,
  onCancel,
}) => {
  const [state, setState] = React.useState<SendMoneyFormState>({
    errors: {},
    hasErrors: false,
    transaction: {
      amount: 0,
      type: TransactionType.DEBIT,
    },
  });

  const validateSingle = (field: string, value: unknown): string =>
    validate.single(value, getValidationConstraints(amountLeft, state.transaction.type)[field]);

  const validateForm = (transaction: TransactionDto): boolean =>
    validate(transaction, getValidationConstraints(amountLeft, transaction.type));

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setState((prevState) => {
      const error = validateSingle(name, value);

      return {
        ...prevState,
        errors: {
          ...prevState.errors,
          [name]: error,
        },
        transaction: {
          ...prevState.transaction,
          [name]: value,
        },
        hasErrors: !!error,
      };
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const hasErrors = !!validateForm(state.transaction);
    if (hasErrors) {
      setState((prevState) => ({
        ...prevState,
        hasErrors,
      }));
      return;
    }
    const transaction = { ...state.transaction, amount: Number.parseFloat(`${state.transaction.amount}`) };
    onSubmit(transaction);
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <Wrapper onSubmit={handleSubmit} noValidate autoComplete="off">
      <InputList>
        <RadioGroup label="Type">
          <Radio
            defaultChecked={state.transaction.type === TransactionType.DEBIT}
            value={TransactionType.DEBIT}
            id="debit"
            label="DEBIT"
            onChange={handleChange}
            name="type"
          />
          <Radio
            defaultChecked={state.transaction.type === TransactionType.CREDIT}
            value={TransactionType.CREDIT}
            id="credit"
            label="CREDIT"
            onChange={handleChange}
            name="type"
          />
        </RadioGroup>
        <Input
          name="amount"
          type="currency"
          label="Amount"
          onChange={handleChange}
          value={state.transaction.amount}
          error={state.errors.amount}
        />
      </InputList>
      <Button type="submit" error={state.hasErrors} loading={!!isSubmitting}>
        Send
      </Button>
      <CancelButton type="reset" onClick={handleCancel}>
        Cancel
      </CancelButton>
    </Wrapper>
  );
};
