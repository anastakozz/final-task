import classNames from 'classnames';
import { ButtonProps } from '@interfaces';

export default function EmptyButton({ children, onClick }: ButtonProps): JSX.Element {
  return (
    <button
      data-testid='empty-button'
      onClick={onClick}
      className={classNames(
        'text-accentColor dark:text-secondaryColor hover:text-secondaryColor dark:hover:text-grayLColor',
        'transition border-2 border-accentColor dark:border-secondaryColor',
        'font-bold bg-none hover:bg-accentColor dark:hover:bg-secondaryColor rounded-normal',
        'h-[74px] px-12 active:scale-95 w-min whitespace-nowrap'
      )}
    >
      {children}
    </button>
  );
}
