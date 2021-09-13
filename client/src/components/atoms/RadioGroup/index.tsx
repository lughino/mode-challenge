/* eslint-disable no-empty-pattern */
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

interface RadioGroupProps {
  label?: string;
}

const Container = styled.div`
  margin-bottom: 24px;
`;

const Wrapper = styled.div`
  min-height: 12px;
  padding: 12px 0;
  position: relative;

  & label {
    margin-right: 24px;
  }
`;

const Label = styled.span`
  font-size: 14px;
  font-weight: 100;
`;

export const RadioGroup: FunctionComponent<RadioGroupProps> = ({ label, children }) => (
  <Container>
    {!!label && <Label>{label}</Label>}
    <Wrapper>{children}</Wrapper>
  </Container>
);
