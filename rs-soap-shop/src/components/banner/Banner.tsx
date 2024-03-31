import HeavyButton from '../buttons/heavyButton';
import { Link } from 'react-router-dom';
import { BannerProps } from '@interfaces';
import classNames from 'classnames';

export function Banner(content: BannerProps) {
  const { label, title, description, buttonText, linkAdress } = content;
  return (
    <div
      data-testid='banner'
      className={classNames(
        'bg-secondaryColor dark:bg-accentDarkColor bg-opacity-90 dark:bg-opacity-90',
        'rounded-normal p-sm h-min max-w-[550px]'
      )}
    >
      <p className='text-grayLColor dark:text-secondaryColor text-base font-semibold my-5'>{label}</p>
      <h2 className='text-accentColor dark:text-secondaryColor text-h3 sm:text-4xl md:text-h2 font-bold md:leading-tight'>
        {title}
      </h2>
      <h4 className='text-grayLColor dark:text-secondaryColor text-h4 font-semibold my-5'>{description}</h4>
      <Link to={linkAdress}>
        <HeavyButton>{buttonText}</HeavyButton>
      </Link>
    </div>
  );
}
