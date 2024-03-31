import React, { useEffect } from 'react';
import NewCollectionSection from './newCollectionSection';
import CheckoutSection from './checkoutSection';
import SaleSection from './saleSection';
import Promocode from './Promocode';
import RandomCardsSection from './randomCardsSection/RandomCardsSection';
import scrollToTop from '@utils/scrollToTop';

function HomePage() {
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div role='home-page'>
      <NewCollectionSection />
      <CheckoutSection />
      <SaleSection />
      <Promocode />
      <RandomCardsSection />
    </div>
  );
}

export default HomePage;
