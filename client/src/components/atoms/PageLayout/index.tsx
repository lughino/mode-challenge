import React, { FunctionComponent, ReactNode } from 'react';
import styled from 'styled-components';
import { media } from '../../../theme';

interface PageLayoutProps {
  children: ReactNode;
}

export const Layout = styled.div`
  display: flex;
  padding: 82px 0;
  height: 100%;

  @media (max-width: ${media.maxPhone}) {
    padding: 24px 0;
  }
`;

export const PageLayout: FunctionComponent<PageLayoutProps> = ({ children, ...props }) => (
  <Layout {...props}>{children}</Layout>
);
