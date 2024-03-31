import { render, fireEvent } from '@testing-library/react';
import EmptyButton from '.';
import { ButtonProps } from '@interfaces';

const mockedCallback = jest.fn();

const props: ButtonProps = {
  children: 'text',
  onClick: mockedCallback
};

it('fires a function click', async () => {
  const component = render(<EmptyButton {...props} />);
  fireEvent.click(component.getByTestId('empty-button'));
  expect(mockedCallback).toBeCalled;
});
