import * as React from 'react';
// tslint:disable-next-line:no-implicit-dependencies
import renderer from 'react-test-renderer';
import { SubTitle } from '.';

describe('SubTitle Component', () => {
  it('should render it with default state', () => {
    const component = renderer.create(<SubTitle>Transactions</SubTitle>);
    expect(component).toMatchSnapshot();
  });
});
