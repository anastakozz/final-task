import { render, screen } from '@testing-library/react';
import SignUpPage from '.';
import { BrowserRouter } from 'react-router-dom';

it('renders SignUp page in DOM', () => {
  render(
    <BrowserRouter>
      <SignUpPage />
    </BrowserRouter>
  );

  expect(screen.queryByText('Registration form:')).toBeInTheDocument();
});
