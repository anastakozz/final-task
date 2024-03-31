import { render, fireEvent } from '@testing-library/react';
import AdditionalButton from '.';
import { ButtonProps } from '@interfaces';

const mockedCallback = jest.fn();

const props: ButtonProps = {
  children: 'text',
  onClick: mockedCallback
};

it('fires a function click', async () => {
  const component = render(<AdditionalButton {...props} />);
  fireEvent.click(component.getByTestId('additional-button'));
  expect(mockedCallback).toBeCalled;
});
