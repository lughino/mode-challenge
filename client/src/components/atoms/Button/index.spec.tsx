import * as React from 'react';
// tslint:disable-next-line:no-implicit-dependencies
import renderer from 'react-test-renderer';
import { Button } from '.';

describe('Button Component', () => {
  it('should render it with default state', () => {
    const component = renderer.create(<Button>Send</Button>);
    expect(component).toMatchSnapshot();
  });

  it('should render it with fullWidth state', () => {
    const component = renderer.create(<Button fullWidth={true}>Send</Button>);
    expect(component).toMatchSnapshot();
  });

  it('should render it with loading state', () => {
    const component = renderer.create(<Button loading={true}>Send</Button>);

    expect(component).toMatchSnapshot();
  });

  it('should render it with type reset', () => {
    const component = renderer.create(<Button type="reset">Reset</Button>);

    expect(component).toMatchSnapshot();
  });
});
