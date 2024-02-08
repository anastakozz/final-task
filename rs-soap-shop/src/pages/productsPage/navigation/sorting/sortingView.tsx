import { OurProductsCardsProps } from '../../../../lib/interfaces';
import { iconClassesNormal } from '../../../../lib/constants';
import { SortABC } from '../../../../icons/sortABC';
import { SortZYX } from '../../../../icons/sortZYX';
import { SortPriceDown } from '../../../../icons/sortPriceDown';
import { SortPriceUp } from '../../../../icons/sortPriceUp';
import handleSorting from './handleSorting';

export let sortingQueryString = '';

export default function SortingView({ changeQuery }: OurProductsCardsProps) {
  function changeSortingParameters(
    isSortPriceUp: boolean,
    isSortPriceDown: boolean,
    isSortABC: boolean,
    isSortZYX: boolean
  ): void {

    if (isSortPriceUp) {
      sortingQueryString = '/search?sort=price%20asc';
    } else if (isSortPriceDown) {
      sortingQueryString = '/search?sort=price%20desc';
    } else if (isSortABC) {
      sortingQueryString = '?sort=name.en%20asc';
    } else if (isSortZYX) {
      sortingQueryString = '?sort=name.en%20desc';
    } else sortingQueryString = '';
    changeQuery(sortingQueryString);
  }

  return (
    <div className={'flex gap-[0.5rem]'}>
      <div className={'flex gap-[0.5rem]'}>
        <div
          className={`${iconClassesNormal} sortAbc`}
          onClick={() => handleSorting('sortAbc', changeSortingParameters)}
        >
          <SortABC />
        </div>
        <div
          className={`${iconClassesNormal} sortZyx`}
          onClick={() => handleSorting('sortZyx', changeSortingParameters)}
        >
          <SortZYX />
        </div>
      </div>
      <div className={'flex gap-[0.5rem]'}>
        <div
          className={`${iconClassesNormal} priceUp`}
          onClick={() => handleSorting('priceUp', changeSortingParameters)}
        >
          <SortPriceUp />
        </div>
        <div
          className={`${iconClassesNormal} priceDown`}
          onClick={() => handleSorting('priceDown', changeSortingParameters)}
        >
          <SortPriceDown />
        </div>
      </div>
    </div>
  );
}
