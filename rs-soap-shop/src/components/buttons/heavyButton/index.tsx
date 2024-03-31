import React from 'react';
import { ButtonProps } from '@interfaces';
import classNames from 'classnames';

export default function HeavyButton({ children, onClick }: ButtonProps): JSX.Element {
  return (
    <button
      data-testid='heavy-button'
      onClick={onClick}
      className={classNames(
        'transition text-secondaryColor font-bold',
        'bg-accentColor hover:bg-accentDarkColor dark:hover:bg-grayLColor',
        'rounded-normal h-[74px] px-12 active:scale-95 w-min whitespace-nowrap'
      )}
    >
      {children}
    </button>
  );
}
