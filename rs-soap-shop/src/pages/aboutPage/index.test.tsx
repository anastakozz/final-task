import { render } from '@testing-library/react';
import AboutPage from './index';
import { ABOUT_US } from '@constants';

describe('AboutPage Component', () => {
  it('renders without errors', () => {
    render(<AboutPage />);
  });

  it('renders the banner text correctly', () => {
    const { getByText } = render(<AboutPage />);
    const bannerText = getByText('ABOUT US');
    expect(bannerText).toBeInTheDocument();
  });

  it('renders team member information correctly', () => {
    const { getByText } = render(<AboutPage />);
    const teamMembers = ABOUT_US;
    teamMembers.forEach(person => {
      const fullName = getByText(person.fullName);

      const bio = getByText(person.bio);
      expect(fullName).toBeInTheDocument();

      expect(bio).toBeInTheDocument();
    });
  });
});
