import classNames from 'classnames';
import SearchButton from '@icons/searchButton';
import { findProducts } from '@services/product.service';
import React, { useRef } from 'react';
import { NavigationViewProps } from '@interfaces';

export default function SearchView({ updateSearchedProducts }: NavigationViewProps) {
  const inputRef = useRef(null);

  const handleSearch = async () => {
    const products = await findProducts(inputRef.current.value);
    updateSearchedProducts(products);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={'flex'}>
      <div className={'relative flex items-stretch flex-grow'}>
        <input
          id='searchInput'
          ref={inputRef}
          placeholder='Search...'
          className={classNames(
            'px-2 py-1 h-[37px]',
            'text-sm font-medium text-gray-700',
            'bg-white rounded-md border border-gray-300 shadow-sm hover:bg-gray-50',
            'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accentDarkColor dark:focus:ring-accentColor'
          )}
          onKeyDown={handleKeyPress}
        />
        <div
          className={classNames(
            'absolute inset-y-0 right-0 flex items-center px-1 m-1',
            'rounded-md bg-white border-[1px] border-gray-400 shadow-sm',
            'hover:cursor-pointer hover:bg-graySColor active:scale-90'
          )}
          onClick={handleSearch}
        >
          <SearchButton />
        </div>
      </div>
    </div>
  );
}
