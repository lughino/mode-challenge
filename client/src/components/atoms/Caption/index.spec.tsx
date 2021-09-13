import * as React from 'react';
// tslint:disable-next-line:no-implicit-dependencies
import renderer from 'react-test-renderer';
import { Caption } from '.';

describe('Caption Component', () => {
  it('should render it with default state', () => {
    const component = renderer.create(<Caption>Caption</Caption>);
    expect(component).toMatchSnapshot();
  });
});
