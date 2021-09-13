import styled from 'styled-components';
import { colors, media } from '../../../theme';

export const Column = styled.div`
  position: relative;
  padding: 24px 60px;
  width: 100%;
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 164px);
  &:nth-child(1) {
    border-right: 1px solid ${colors.default};
  }
  @media (max-width: ${media.maxPhone}) {
    padding: 0 4%;
    max-height: unset;
  }
`;
