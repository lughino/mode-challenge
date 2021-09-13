import React from 'react';
// tslint:disable-next-line:no-implicit-dependencies
import renderer from 'react-test-renderer';
import { SendMoney } from '.';

it('renders without crashing', () => {
  const component = renderer.create(
    <SendMoney
      balance={13000}
      isSubmittingTransaction={false}
      sendTransaction={jest.fn()}
      getCurrentBalance={jest.fn()}
    />,
  );
  expect(component).toMatchSnapshot();
});
