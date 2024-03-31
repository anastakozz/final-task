import { useNavigate } from 'react-router-dom';
import HeavyButton from '@components/buttons/heavyButton';

export function EmptyCart() {
  const navigate = useNavigate();

  return (
    <div className='flex flex-col justufy-center items-center'>
      <h4 className='text-accentColor dark:text-basicColor font-bold text-h4 text-center my-10'>
        Your Cart is currently empty!
      </h4>
      <img className='w-[200px] mb-10 dark:invert' src='/images/empty-cart.png' alt='empty-cart' />
      <p className='text-center'>Before proceed to checkout you should add some products to your shopping cart.</p>
      <p className='text-center mb-4'>You will find a lot of interesting products on Our products page</p>
      <HeavyButton
        onClick={() => {
          navigate('/our-products');
        }}
      >
        Go shopping
      </HeavyButton>
    </div>
  );
}
