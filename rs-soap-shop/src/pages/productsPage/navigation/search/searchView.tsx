import classNames from 'classnames';
import SearchButton from '../../../../icons/searchButton';
import React, { useState } from 'react';
import { SearchViewProps } from '@interfaces';

export default function SearchView({ setSearchValue }: SearchViewProps) {
  const [inputValue, setInputValue] = useState('');

  return (
    <div className={'flex'}>
      <div className={'relative flex items-stretch flex-grow'}>
        <input
          value={inputValue}
          placeholder='Search...'
          className={classNames(
            'px-2 py-1 h-[37px]',
            'text-sm font-medium text-gray-700',
            'bg-white rounded-md border border-gray-300 shadow-sm hover:bg-gray-50',
            'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accentDarkColor dark:focus:ring-accentColor'
          )}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && setSearchValue(inputValue)}
        />
        <div
          className={classNames(
            'absolute inset-y-0 right-0 flex items-center px-1 m-1',
            'rounded-md bg-white border-[1px] border-gray-400 shadow-sm',
            'hover:cursor-pointer hover:bg-graySColor active:scale-90'
          )}
          onClick={() => setSearchValue(inputValue)}
        >
          <SearchButton />
        </div>
      </div>
    </div>
  );
}
