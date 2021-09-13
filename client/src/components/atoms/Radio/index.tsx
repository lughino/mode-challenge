import { FunctionComponent } from 'react';
import styled from 'styled-components';

export interface RadioProps {
  name: string;
  id: string;
  value: string;
  defaultChecked?: boolean;
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioLabel = styled.label`
  font-weight: 600;
  margin-left: 20px;
  display: inline-block;
`;
const RadioInput = styled.input.attrs({
  type: 'radio',
})`
  float: left;
  margin: 4px 0 0 -20px;
  vertical-align: middle;
`;
const Span = styled.span`
  display: inline-block;
`;

export const Radio: FunctionComponent<RadioProps> = ({ onChange, label, ...rest }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <RadioLabel>
      <RadioInput onChange={handleChange} {...rest} />
      <Span>{label}</Span>
    </RadioLabel>
  );
};
