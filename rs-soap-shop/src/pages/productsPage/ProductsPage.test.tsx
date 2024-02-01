import { render, screen } from '@testing-library/react';
import ProductsPage from './ProductsPage';
import { BrowserRouter } from 'react-router-dom';
import { CartContext } from '../../App';

it('renders detailedPage page in DOM', () => {
  render(
    <CartContext.Provider value={[null]}>
      <BrowserRouter>
        <ProductsPage />
      </BrowserRouter>
    </CartContext.Provider>
  );

  expect(screen.queryByText('OUR PRODUCTS')).toBeInTheDocument();
});
