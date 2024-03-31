import React from 'react';
import { ButtonProps } from '@interfaces';

export default function AdditionalButton({ type, children, onClick, notFixedWidth }: ButtonProps): JSX.Element {
  return (
    <button
      type={type ? type : 'button'}
      data-testid='additional-button'
      onClick={onClick}
      className={`rounded transition text-secondaryColor font-bold bg-accentColor/80 hover:bg-accentDarkColor/80 dark:hover:bg-grayLColor ${
        notFixedWidth ? 'px-2' : 'w-[70px] px-0'
      } py-[5px] mb-2 md:mr-2  md:mb-0`}
    >
      {children}
    </button>
  );
}
