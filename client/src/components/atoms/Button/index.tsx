import styled, { css } from 'styled-components';
import { colors } from '../../../theme';

interface ButtonProps {
  /**
   * Take the full width of the parent
   */
  fullWidth?: boolean;
  /**
   * Show the loading state (disabled)
   */
  loading?: boolean;
  /**
   * Disable the button when button is in error state
   */
  error?: boolean;
}

export const Button = styled.button.attrs<ButtonProps>(({ loading, error }) => ({
  disabled: !!loading || !!error,
}))<ButtonProps>`
  background-color: ${({ type }) => (type === 'reset' ? colors.default : colors.primary)};
  border-color: ${({ type }) => (type === 'reset' ? colors.default : colors.primary)};
  border-radius: 28px;
  padding: 16px 32px;
  color: #ffffff;
  box-shadow: 0px 0px 1px 0px ${({ type }) => (type === 'reset' ? colors.default : colors.primary)};
  ${(props) =>
    props.fullWidth &&
    css`
      width: 100%;
    `}
  ${({ error, loading }) =>
    (!!loading || !!error) &&
    css`
      &:disabled,
      &[disabled] {
        background-color: ${colors.primaryLight};
        box-shadow: 0px 0px 1px 0px ${colors.primaryLight};
      }
    `}
  :focus {
    outline: none;
  }
  :active {
    transform: translateY(1px);
    box-shadow: 0px 0px 0px 0px ${colors.primary};
  }
  text-align: center;
  font-size: 16px;
`;
