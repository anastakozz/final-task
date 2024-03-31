import React from 'react';
import { ButtonProps } from '@interfaces';
import classNames from 'classnames';

export default function SmallButton({ children, onClick }: ButtonProps): JSX.Element {
  return (
    <button
      onClick={onClick}
      className={classNames(
        'cart-button transition',
        'text-secondaryColor font-bold bg-accentColor/80 hover:bg-accentDarkColor/80 dark:hover:bg-grayLColor',
        'h-[30px] w-full px-12'
      )}
    >
      {children}
    </button>
  );
}
export const smallButtonClassesInactive =
  'cart-button text-secondaryColor font-bold bg-grayLColor  h-[30px] w-full px-12';
