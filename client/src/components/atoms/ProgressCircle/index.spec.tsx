import * as React from 'react';
// tslint:disable-next-line:no-implicit-dependencies
import renderer from 'react-test-renderer';
import { ProgressCircle } from '.';

describe('ProgressCircle Component', () => {
  it('should render it with default state', () => {
    const component = renderer.create(<ProgressCircle progress={75} />);
    expect(component).toMatchSnapshot();
  });

  it('should render it with activeColor state', () => {
    const component = renderer.create(
      <ProgressCircle progress={75} activeColor="#AAB428" />,
    );
    expect(component).toMatchSnapshot();
  });

  it('should render it with backgroundColor state', () => {
    const component = renderer.create(
      <ProgressCircle progress={75} backgroundColor="#cccccc" />,
    );

    expect(component).toMatchSnapshot();
  });

  it('should render it with all the props', () => {
    const component = renderer.create(
      <ProgressCircle
        progress={75}
        activeColor="#FA33D6"
        backgroundColor="#CA66FF"
        duration="3s"
        sizeCircle={120}
      />,
    );

    expect(component).toMatchSnapshot();
  });
});
