import React from 'react';
import styled from 'styled-components';
import { colors } from '../../../theme';
import { currencyFormatter, dateHumanFormatter } from '../../../utils';
import { Caption } from '../../atoms/Caption';
import { Text } from '../../atoms/Text';
import { Transaction, TransactionType } from '../../../types';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 56px;
  border-bottom: 1px solid ${colors.default};
  padding: 4px;
`;

const LeftSide = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
`;

const RightSide = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TextName = styled(Text)`
  margin-bottom: 6px;
`;

interface AmountProps {
  type: TransactionType;
}

const Amount = styled(Text)<AmountProps>`
  font-weight: 700;
  color: ${(props) => (props.type === TransactionType.CREDIT ? colors.greenDark : colors.redDark)};
`;

export const TransactionItem: React.FunctionComponent<Transaction> = ({ type, date, amount }) => (
  <Wrapper>
    <LeftSide>
      <TextName>{type.toUpperCase()}</TextName>
      <Caption>{dateHumanFormatter(date)}</Caption>
    </LeftSide>
    <RightSide>
      <Amount type={type}>{currencyFormatter(amount)}</Amount>
    </RightSide>
  </Wrapper>
);
