import { render, fireEvent } from '@testing-library/react';
import HeavyButton from '.';
import { ButtonProps } from '@interfaces';

const mockedCallback = jest.fn();

const props: ButtonProps = {
  children: 'text',
  onClick: mockedCallback
};

it('fires a function click', async () => {
  const component = render(<HeavyButton {...props} />);
  fireEvent.click(component.getByTestId('heavy-button'));
  expect(mockedCallback).toBeCalled;
});
