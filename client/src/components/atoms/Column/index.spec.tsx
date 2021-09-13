import * as React from 'react';
// tslint:disable-next-line:no-implicit-dependencies
import renderer from 'react-test-renderer';
import { Column } from '.';

describe('Column Component', () => {
  it('should render it with default state', () => {
    const component = renderer.create(
      <Column>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
          blanditiis voluptatem temporibus, nihil deserunt ipsam qui iste
          voluptate itaque earum, officiis dolor optio? Voluptate,
          exercitationem? Consequatur doloribus recusandae nobis mollitia!
        </p>
      </Column>,
    );
    expect(component).toMatchSnapshot();
  });
});
