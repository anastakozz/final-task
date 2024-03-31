import { render } from '@testing-library/react';
import { Banner } from './Banner';
import { BannerProps } from '@interfaces';
import { BrowserRouter } from 'react-router-dom';

const propsData: BannerProps = {
  label: 'A',
  title: 'B',
  description: 'C',
  buttonText: 'text',
  linkAdress: 'adress'
};

it('renders a banner in DOM', () => {
  const component = render(
    <BrowserRouter>
      <Banner {...propsData} />
    </BrowserRouter>
  );
  expect(component.getByTestId('banner')).toBeInTheDocument();
});
