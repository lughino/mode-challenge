// tslint:disable-next-line:no-implicit-dependencies
import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
// tslint:disable-next-line:no-implicit-dependencies
import renderer from 'react-test-renderer';
import { ISendMoneyFormProps, ISendMoneyFormState, SendMoneyForm } from '.';
import { Button } from '../../atoms/Button';

describe('SendMoneyForm Component', () => {
  const changeInputValue = (input: ReactWrapper, value: any) =>
    input.find('input').simulate('change', { target: { value } });
  it('should render it with default state', () => {
    const cb = jest.fn();
    const component = renderer.create(
      <SendMoneyForm amountLeft={13000} onSubmit={cb} />,
    );
    expect(component).toMatchSnapshot();
  });

  it('should not trigger the onSubmit callback when the form is empty', () => {
    const onSubmit = jest.fn();
    const component = mount(
      <SendMoneyForm
        amountLeft={13000}
        onSubmit={onSubmit}
        isSubmitting={false}
      />,
    );
    component.find(Button).simulate('submit');
    expect(onSubmit).not.toBeCalled();
  });

  it('should not trigger the onSubmit callback when the form is invalid (email), showing the inline error', () => {
    const onSubmit = jest.fn();
    const component = mount<ISendMoneyFormProps, ISendMoneyFormState>(
      <SendMoneyForm amountLeft={13000} onSubmit={onSubmit} />,
    );
    const inputName = component.find({ name: 'name' });
    changeInputValue(inputName, 'Nicole');

    const inputEmail = component.find({ name: 'email' });
    changeInputValue(inputEmail, 'not_valid');

    expect(component.state().errors.email).toEqual([
      'Please enter a valid email',
    ]);

    component.find(Button).simulate('submit');
    expect(onSubmit).not.toBeCalled();
  });

  it('should not trigger the onSubmit callback when the form is invalid (name), showing the inline error', () => {
    const onSubmit = jest.fn();
    const component = mount<ISendMoneyFormProps, ISendMoneyFormState>(
      <SendMoneyForm amountLeft={13000} onSubmit={onSubmit} />,
    );
    const inputName = component.find({ name: 'name' });
    changeInputValue(inputName, 'Nicole');
    changeInputValue(inputName, '');

    const inputEmail = component.find({ name: 'email' });
    changeInputValue(inputEmail, 'nicole@zopa.com');

    const inputAmount = component.find({ name: 'amount' });
    changeInputValue(inputAmount, 3000);

    expect(component.state().errors.name).toEqual(['Please enter a name']);

    component.find(Button).simulate('submit');
    expect(onSubmit).not.toBeCalled();
  });

  it('should not trigger the onSubmit callback when the form is invalid (amount), showing the inline error', () => {
    const onSubmit = jest.fn();
    const component = mount<ISendMoneyFormProps, ISendMoneyFormState>(
      <SendMoneyForm amountLeft={13000} onSubmit={onSubmit} />,
    );
    const inputName = component.find({ name: 'name' });
    changeInputValue(inputName, 'Nicole');

    const inputEmail = component.find({ name: 'email' });
    changeInputValue(inputEmail, 'nicole@zopa.com');

    const inputAmount = component.find({ name: 'amount' });
    changeInputValue(inputAmount, 120);
    changeInputValue(inputAmount, 0);

    expect(component.state().errors.amount).toEqual([
      'Please enter an amount greater than 0',
    ]);

    changeInputValue(inputAmount, 'not-allowed');

    expect(component.state().errors.amount).toEqual([
      'Please enter a valid amount',
    ]);

    changeInputValue(inputAmount, 14000);

    expect(component.state().errors.amount).toEqual([
      'Please enter an amount less then or equal to £13,000.00',
    ]);

    component.find(Button).simulate('submit');
    expect(onSubmit).not.toBeCalled();
  });

  it('should trigger the onSubmit callback when the form is valid', () => {
    const onSubmit = jest.fn();
    const component = mount<ISendMoneyFormProps, ISendMoneyFormState>(
      <SendMoneyForm amountLeft={13000} onSubmit={onSubmit} />,
    );
    const inputName = component.find({ name: 'name' });
    changeInputValue(inputName, 'Nicole');

    const inputEmail = component.find({ name: 'email' });
    changeInputValue(inputEmail, 'nicole@zopa.com');

    const inputAmount = component.find({ name: 'amount' });
    changeInputValue(inputAmount, 3000);

    component.find(Button).simulate('submit');
    expect(onSubmit).toBeCalled();
    expect(onSubmit).toHaveBeenCalledWith({
      amount: 3000,
      email: 'nicole@zopa.com',
      name: 'Nicole',
    });
  });
});
