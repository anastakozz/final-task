import { SelectCategory } from './selectCategory/selectCategory';
import SortingView from './sorting/sortingView';
import FilterView from './filter/filterView';
import SearchView from './search/searchView';
import Breadcrumb from '../../../components/BasicBreadcrumbs';
import React, { useEffect, useState } from 'react';
import { NavigationViewProps } from '../../../lib/interfaces';
import { useParams } from 'react-router-dom';
import { QueryStringPrefix } from '../../../lib/enums';

export function NavigationView({ nav, changeQuery }: NavigationViewProps) {
  const { category, subcategory } = useParams();
  const [filterQuery, setFilterQuery] = useState('');
  const [sortQuery, setSortQuery] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const buildQueryString = (isPriceSorting: boolean): string => {
    if (!filterQuery && !sortQuery) return '';

    let queryString = '';
    if (!filterQuery) {
      if (category || subcategory) {
        queryString = isPriceSorting ? sortQuery.slice(QueryStringPrefix.priceSortLength) : sortQuery.slice(QueryStringPrefix.nameSortLength);
      } else {
        queryString = isPriceSorting ? `/${sortQuery.slice(QueryStringPrefix.nameSortLength)}` : `?${sortQuery.slice(QueryStringPrefix.nameSortLength)}`;
      }
    } else if (!sortQuery) {
      queryString = category || subcategory ? `${filterQuery}` : `/search?${filterQuery}`;
    } else {
      if (category || subcategory) {
        queryString = isPriceSorting ? `${filterQuery}&${sortQuery.slice(QueryStringPrefix.priceSortLength)}` : `${filterQuery}&${sortQuery.slice(QueryStringPrefix.nameSortLength)}`;
      } else queryString = isPriceSorting ? `/search?${filterQuery}&${sortQuery.slice(QueryStringPrefix.priceSortLength)}` : `/search?${filterQuery}&${sortQuery.slice(QueryStringPrefix.nameSortLength)}`;
    }
    return queryString;
  }

  useEffect(() => {
    searchValue === '' ? changeQuery('') : changeQuery(`/search?text.en="${searchValue}"`);
  }, [searchValue]);

  useEffect(() => {
    const isPriceSorting = sortQuery.includes('price');
    const queryString = buildQueryString(isPriceSorting);
    changeQuery(queryString);
  }, [sortQuery, filterQuery, category, subcategory]);

  return (
    <div role='catalog-nav' className='bg-accentColor dark:bg-accentDarkColor text-primaryColor '>
      <div className='flex flex-wrap justify-between items-center max-w-[1440px] py-4 px-4 mx-auto lg:px-big gap-[10px]'>
        <Breadcrumb nav={nav} />
        <div className='flex flex-wrap gap-[10px]'>
          <SelectCategory nav={nav} />
          <SearchView setSearchValue={setSearchValue} />
          <div className='flex flex-wrap gap-[10px] flex-row-reverse'>
            <FilterView changeQuery={setFilterQuery} />
            <SortingView changeQuery={setSortQuery} />
          </div>
        </div>
      </div>
    </div>
  );
}
