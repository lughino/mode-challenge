import * as React from 'react';
// tslint:disable-next-line:no-implicit-dependencies
import renderer from 'react-test-renderer';
import { TransactionItem } from '.';

describe('TransactionItem Component', () => {
  it('should render it with default state', () => {
    const component = renderer.create(
      <TransactionItem name="Luca" email="luca@zopa.com" amount={10000.23} />,
    );
    expect(component).toMatchSnapshot();
  });
});
