import * as React from 'react';
// tslint:disable-next-line:no-implicit-dependencies
import renderer from 'react-test-renderer';
import { Text } from '.';

describe('Text Component', () => {
  it('should render it with default state', () => {
    const component = renderer.create(
      <Text>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</Text>,
    );
    expect(component).toMatchSnapshot();
  });
});
