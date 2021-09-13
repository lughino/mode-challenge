/* eslint-disable no-empty-pattern */
import React, { FunctionComponent } from 'react';
import styled, { css } from 'styled-components';
import { colors } from '../../../theme';

interface InputProps {
  name: string;
  type?: 'text' | 'password' | 'email' | 'currency';
  disabled?: boolean;
  label?: string;
  maxLength?: number;
  readOnly?: boolean;
  value?: string | number;
  error?: string;
  onBlur?: (event: React.ChangeEvent<HTMLInputElement>, {}) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, {}) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

interface State {
  isFocused?: boolean;
}

const NON_FOCUSED_COLOR = colors.default;
const ERROR_COLOR = colors.error;
const FOCUSED_COLOR = colors.primary;
const TRANSITION_TIME = '.5s';

const Container = styled.div`
  margin-bottom: 48px;
`;

const Wrapper = styled.div<State & { showError: boolean }>`
  min-height: 52px;
  padding: 0;
  position: relative;
  ${({ isFocused, showError }) =>
    // eslint-disable-next-line no-nested-ternary
    showError
      ? css`
          border-bottom: 2px solid ${ERROR_COLOR};
        `
      : isFocused
      ? css`
          border-bottom: 2px solid ${FOCUSED_COLOR};
        `
      : css`
          border-bottom: 2px solid ${NON_FOCUSED_COLOR};
        `}
  transition: border-bottom ${TRANSITION_TIME} ease-out;
`;

const InnerInput = styled.input<State & { showError: boolean }>`
  font-size: 22px;
  margin: 0;
  width: 100%;
  height: 42px;
  outline: 0;
  border: none;
  background-color: #ffffff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  &[type='number']::-webkit-inner-spin-button,
  &[type='number']::-webkit-outer-spin-button {
    appearance: none;
    margin: 0;
  }
  ${({ type }) =>
    type === 'number' &&
    css`
      padding-left: 18px;
    `}
  ${({ isFocused, showError }) =>
    // eslint-disable-next-line no-nested-ternary
    showError
      ? css`
          caret-color: ${ERROR_COLOR};
        `
      : isFocused
      ? css`
          caret-color: ${FOCUSED_COLOR};
        `
      : css`
          caret-color: ${NON_FOCUSED_COLOR};
        `}
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 100;
`;

const ErrorMessage = styled.span`
  font-size: 14px;
  color: ${ERROR_COLOR};
  position: absolute;
`;

const Currency = styled.span`
  position: absolute;
  bottom: 8px;
  left: 0;
  font-size: 22px;
`;

export const Input: FunctionComponent<InputProps> = ({
  name,
  type = 'text',
  disabled = false,
  label,
  maxLength,
  readOnly = false,
  value,
  error,
  onBlur,
  onChange,
  onFocus,
}) => {
  const [isFocused, setIsFocused] = React.useState(false);

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    if (onFocus) {
      onFocus(event);
    }
  };

  const handleBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsFocused(false);
    if (onBlur) {
      onBlur(event, { value: event.target.value });
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event, { value: event.target.value });
    }
  };

  return (
    <Container>
      <Wrapper isFocused={isFocused} showError={!!error}>
        {!!label && <Label htmlFor={name}>{label}</Label>}
        <InnerInput
          showError={!!error}
          id={name}
          name={name}
          type={type === 'currency' ? 'number' : type}
          disabled={disabled}
          maxLength={maxLength}
          readOnly={readOnly}
          value={value || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          isFocused={isFocused}
        />
        {type === 'currency' && <Currency>£</Currency>}
      </Wrapper>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Container>
  );
};
