import { ButtonProps } from '@interfaces';
import { Link } from 'react-router-dom';

export default function ButtonForm({ children, to, onClick }: ButtonProps): JSX.Element {
  return (
    <Link
      onClick={onClick}
      to={to}
      className='transition inline-flex whitespace-nowrap items-center text-accentColor dark:text-secondaryColor border-2 border-accentColor dark:border-secondaryColor hover:text-secondaryColor dark:hover:text-grayLColor font-bold bg-none hover:bg-accentColor dark:hover:bg-secondaryColor rounded-normal h-[74px] px-12 active:scale-95'
    >
      {children}
    </Link>
  );
}
