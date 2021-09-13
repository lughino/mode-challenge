import * as React from 'react';
// tslint:disable-next-line:no-implicit-dependencies
import renderer from 'react-test-renderer';
import SImmutable from 'seamless-immutable';
import { TransactionList } from '.';

describe('TransactionList Component', () => {
  const mock = [
    {
      amount: 1500,
      email: 'natalia@zopa.com',
      id: 'b0d5d22d-3253-4350-b495-b234484afb9c',
      name: 'Natalia',
    },
    {
      amount: 1000,
      email: 'thomas@zopa.com',
      id: 'fe1e2b2f-e7f0-45bb-a8e1-7862442f5cbd',
      name: 'Thomas',
    },
    {
      amount: 2000,
      email: 'martin@zopa.com',
      id: '114ca808-d99e-4fc8-aded-84751ee1a223',
      name: 'Martin',
    },
  ];
  it('should render it with default state', () => {
    const mockData = SImmutable(mock);
    const component = renderer.create(
      <TransactionList transactions={mockData} />,
    );
    expect(component).toMatchSnapshot();
  });
});
