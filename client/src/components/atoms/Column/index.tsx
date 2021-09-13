import styled from 'styled-components';
import { colors, media } from '../../../theme';

export const Column = styled.div`
  position: relative;
  padding: 24px 80px;
  width: 100%;
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 160px);
  &:nth-child(1) {
    border-right: 1px solid ${colors.default};
  }
  @media (max-width: ${media.maxPhone}) {
    padding: 24px 4%;
    max-height: unset;
  }
`;
