import * as React from 'react';
// tslint:disable-next-line:no-implicit-dependencies
import renderer from 'react-test-renderer';
import { Dashboard } from '.';

describe('Dashboard Component', () => {
  it('should render it with default state', () => {
    const component = renderer.create(
      <Dashboard leftAvailable={13500} totalSent={4500} />,
    );
    expect(component).toMatchSnapshot();
  });
});
