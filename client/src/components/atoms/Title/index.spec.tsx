import * as React from 'react';
// tslint:disable-next-line:no-implicit-dependencies
import renderer from 'react-test-renderer';
import { Title } from '.';

describe('Title Component', () => {
  it('should render it with default state', () => {
    const component = renderer.create(<Title>Send money</Title>);
    expect(component).toMatchSnapshot();
  });
});
