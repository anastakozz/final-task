import { ButtonProps } from '@interfaces';
import React from 'react';

export default function FilterButton({ children, onClick, role }: ButtonProps): JSX.Element {
  return (
    <button
      role={role}
      onClick={onClick}
      className='transition block text-secondaryColor font-bold bg-accentColor hover:bg-accentDarkColor dark:hover:bg-grayLColor rounded-normal h-[37px] px-8 active:scale-95'
    >
      {children}
    </button>
  );
}
