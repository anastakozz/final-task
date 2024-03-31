import { render, screen } from '@testing-library/react';
import { ResultProps } from '@interfaces';
import ResultMessage from './ResultMessage';

const propsDataTrue: ResultProps = {
  isSuccess: false,
  message: '',
  isVisible: true
};
const propsDataFalse: ResultProps = {
  isSuccess: false,
  message: '',
  isVisible: false
};

it('renders a message in DOM', () => {
  const { getByTestId } = render(<ResultMessage {...propsDataTrue} />);
  expect(getByTestId('reg-result-message')).toBeInTheDocument();
});

it('renders an error message in DOM', () => {
  const { getByTestId } = render(<ResultMessage {...propsDataTrue} />);
  expect(getByTestId('reg-error-message')).toBeInTheDocument();
});

it('returns null if !isVisible', () => {
  render(<ResultMessage {...propsDataFalse} />);
  expect(screen.queryByTestId('reg-error-message')).not.toBeInTheDocument();
});
