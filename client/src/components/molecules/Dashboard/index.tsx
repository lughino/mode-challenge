import React from 'react';
import styled from 'styled-components';
import { currencyFormatter } from '../../../utils';
import { ProgressCircle } from '../../atoms/ProgressCircle';
import { Text } from '../../atoms/Text';

interface DashboardProps {
  totalSent: number;
  /**
   * Left Available amount
   */
  leftAvailable: number;
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 120px;
  width: 100%;
  max-width: 400px;
  margin: 24px 0;
  padding: 0px 22px;
`;

const LeftSide = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-direction: column;
`;

const Center = styled.div`
  width: 98px;
  height: 98px;
`;

const RightSide = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
`;

const Amount = styled(Text)`
  font-weight: 700;
  margin-bottom: 6px;
`;

export const Dashboard: React.FunctionComponent<DashboardProps> = ({ leftAvailable, totalSent }) => {
  const progress = 100 - (totalSent * 100) / (totalSent + leftAvailable);
  return (
    <Wrapper>
      <LeftSide>
        <Amount>{currencyFormatter(totalSent)}</Amount>
        <Text>total sent</Text>
      </LeftSide>
      <Center>
        <ProgressCircle progress={progress} />
      </Center>
      <RightSide>
        <Amount>{currencyFormatter(leftAvailable)}</Amount>
        <Text>left available</Text>
      </RightSide>
    </Wrapper>
  );
};
