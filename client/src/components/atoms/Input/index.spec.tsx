// tslint:disable-next-line:no-implicit-dependencies
import { mount } from 'enzyme';
import * as React from 'react';
// tslint:disable-next-line:no-implicit-dependencies
import renderer from 'react-test-renderer';
import { Input } from '.';

describe('Input Component', () => {
  it('should render it with default state', () => {
    const component = renderer.create(<Input label="Address" name="default" />);
    expect(component).toMatchSnapshot();
  });

  it('should render it with default value state', () => {
    const component = renderer.create(
      <Input value="Street" label="Address" name="default" />,
    );
    expect(component).toMatchSnapshot();
  });

  it('should render it with disabled state', () => {
    const component = renderer.create(
      <Input label="Address" name="default" disabled={true} />,
    );

    expect(component).toMatchSnapshot();
  });

  it('should render it with number type', () => {
    const component = renderer.create(
      <Input label="Amount" name="amount" type="number" />,
    );

    expect(component).toMatchSnapshot();
  });

  it('should render it with password type', () => {
    const component = renderer.create(
      <Input label="Password" name="pwd" type="password" />,
    );

    expect(component).toMatchSnapshot();
  });

  it('should render it without label', () => {
    const component = renderer.create(<Input name="default" />);

    expect(component).toMatchSnapshot();
  });

  it('should render it with maxLength', () => {
    const component = renderer.create(<Input name="default" maxLength={10} />);

    expect(component).toMatchSnapshot();
  });

  it('should render it in read only state', () => {
    const component = renderer.create(<Input name="default" readOnly={true} />);

    expect(component).toMatchSnapshot();
  });

  it('should render it in error state', () => {
    const component = renderer.create(
      <Input name="default" error="This field cannot be empty" />,
    );

    expect(component).toMatchSnapshot();
  });

  it('should trigger onFocus when user press on the input field', () => {
    const onFocus = jest.fn();
    const component = mount(
      <Input
        onFocus={onFocus}
        label="label"
        name="default"
        value="defaultValue"
      />,
    );
    component.find('input').simulate('focus');
    expect(onFocus).toHaveBeenCalled();
    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(onFocus.mock.calls[0][0].target.value).toEqual('defaultValue');
  });

  it('should trigger onBlur when the user leaves the input field', () => {
    const onBlur = jest.fn();
    const component = mount(
      <Input
        onBlur={onBlur}
        label="label"
        name="default"
        value="defaultBlurValue"
      />,
    );
    component.find('input').simulate('blur');
    expect(onBlur).toHaveBeenCalled();
    expect(onBlur).toHaveBeenCalledTimes(1);
    expect(onBlur.mock.calls[0][0].target.value).toEqual('defaultBlurValue');
    expect(onBlur.mock.calls[0][1].value).toEqual('defaultBlurValue');
  });

  it('should trigger onChange when the user change the input field', () => {
    const onChange = jest.fn();
    const component = mount(
      <Input
        onChange={onChange}
        label="label"
        name="default"
        value="defaultChangeValue"
      />,
    );
    component.find('input').simulate('change');
    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0].target.value).toEqual(
      'defaultChangeValue',
    );
    expect(onChange.mock.calls[0][1].value).toEqual('defaultChangeValue');
  });
});
