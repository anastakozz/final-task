import { SelectCategory } from './selectCategory/selectCategory';
import SortingView from './sorting/sortingView';
import FilterView from './filter/filterView';
import SearchView from './search/searchView';
import Breadcrumb from '../../../components/BasicBreadcrumbs';
import React, { useState } from 'react';
import { NavigationViewProps } from '../../../lib/interfaces';

export function NavigationView({ nav, changeQuery, setSearchValue }: NavigationViewProps) {
  const [filterQuery, setFilterQuery] = useState('');
  const [sortQuery, setSortQuery] = useState('');

  function updateFilterQuery(options: string) {
    setFilterQuery(options);
    changeQuery(`${options}&${sortQuery}`);
  }

  function updateSortQuery(options: string) {
    setSortQuery(options);
    changeQuery(`${filterQuery}&${options}`);
  }

  return (
    <div role='catalog-nav' className='bg-accentColor dark:bg-accentDarkColor text-primaryColor '>
      <div className='flex flex-wrap justify-between items-center max-w-[1440px] py-4 px-4 mx-auto lg:px-big gap-[10px]'>
        <Breadcrumb nav={nav} />
        <div className='flex flex-wrap gap-[10px]'>
          <SelectCategory nav={nav} />
          <SearchView setSearchValue={setSearchValue} />
          <div className='flex flex-wrap gap-[10px] flex-row-reverse'>
            <FilterView changeQuery={updateFilterQuery} />
            <SortingView changeQuery={updateSortQuery} />
          </div>
        </div>
      </div>
    </div>
  );
}
