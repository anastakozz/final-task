import { Link } from 'react-router-dom';
import SaleIcon from '@icons/saleIcon';
import ArrowSmallIcon from '@icons/arrowSmallIcon';
import classNames from 'classnames';

export default function Promocode() {
  return (
    <Link to={'/our-products'}>
      <div
        className={classNames(
          'flex items-center justify-center p-sm text-center transition',
          ' bg-accentColor  text-greyLColor hover:text-secondaryColor',
          'dark:bg-accentDarkColor dark:text-basicColor dark:hover:text-secondaryColor'
        )}
      >
        <div className='mr-sm'>
          <SaleIcon></SaleIcon>
        </div>
        <span className='text-sm sm:text-base md:text-2xl lg:text-h3 font-bold'>
          Get a 5% discount on the promo code &quot;NATURE&quot;
        </span>
        <ArrowSmallIcon />
      </div>
    </Link>
  );
}
