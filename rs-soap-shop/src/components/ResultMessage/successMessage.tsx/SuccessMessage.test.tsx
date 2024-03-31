import { fireEvent, render } from '@testing-library/react';
import ResultMessage from '../ResultMessage';
import SuccessMessage from './SuccessMessage';
import { ResultProps } from '@interfaces';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate
}));

const propsDataTrue: ResultProps = {
  isSuccess: true,
  message: '',
  isVisible: true
};

it('renders a success message in DOM', () => {
  const component = render(<ResultMessage {...propsDataTrue} />);
  const message = component.getByTestId('reg-success-message');
  expect(message).toBeInTheDocument();
});

it('navigates on click', async () => {
  const component = render(<SuccessMessage />);
  fireEvent.click(component.getByTestId('reg-success-message'));
  expect(mockedUsedNavigate).toBeCalled;
});

it('navigates on keyup', async () => {
  fireEvent.keyUp;
  expect(mockedUsedNavigate).toBeCalled;
});
