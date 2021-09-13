import React from 'react';
// tslint:disable-next-line:no-implicit-dependencies
import renderer from 'react-test-renderer';
import SImmutable from 'seamless-immutable';
import { MyAccount } from '.';

it('renders without crashing', () => {
  const component = renderer.create(
    <MyAccount
      balance={13000}
      sendTransaction={jest.fn()}
      getTransactionList={jest.fn()}
      totalSent={4000}
      transactions={SImmutable([
        {
          amount: 3000,
          created_at: new Date(),
          email: 'email@email.com',
          id: '100',
          name: 'Name',
        },
      ])}
    />,
  );
  expect(component).toMatchSnapshot();
});
