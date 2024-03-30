import { OurProductsCardsProps } from '../../../../lib/interfaces';
import { iconClassesNormal } from '../../../../lib/constants';
import { SortABC } from '../../../../icons/sortABC';
import { SortZYX } from '../../../../icons/sortZYX';
import { SortPriceDown } from '../../../../icons/sortPriceDown';
import { SortPriceUp } from '../../../../icons/sortPriceUp';
import { useState } from 'react';

export default function SortingView({ changeQuery }: OurProductsCardsProps) {
  const [sortButtonsState, setSortButtonsState] = useState({
    priceUp: false,
    priceDown: false,
    sortAbc: false,
    sortZyx: false,
  });

  function setBtnState(btnName: string) {
    setSortButtonsState({
      priceUp: btnName !== 'priceUp' ? false : !sortButtonsState.priceUp,
      priceDown: btnName !== 'priceDown' ? false : !sortButtonsState.priceDown,
      sortAbc: btnName !== 'sortAbc' ? false : !sortButtonsState.sortAbc,
      sortZyx: btnName !== 'sortZyx' ? false : !sortButtonsState.sortZyx,
    })
  }

  return (
    <div className={'flex gap-[0.5rem]'}>
      <div className={'flex gap-[0.5rem]'}>
        <div
          className={`${iconClassesNormal} sortAbc ${sortButtonsState.sortAbc && 'bg-grayLColor/90'}`}
          onClick={() => {
            setBtnState('sortAbc');
            sortButtonsState?.sortAbc ? changeQuery('') : changeQuery('?sort=name.en%20asc');
          }}
        >
          <SortABC />
        </div>
        <div
          className={`${iconClassesNormal} sortZyx ${sortButtonsState.sortZyx && 'bg-grayLColor/90'}`}
          onClick={() => {
            setBtnState('sortZyx');
            sortButtonsState?.sortZyx ? changeQuery('') : changeQuery('?sort=name.en%20desc');
          }}
        >
          <SortZYX />
        </div>
      </div>
      <div className={'flex gap-[0.5rem]'}>
        <div
          className={`${iconClassesNormal} priceUp ${sortButtonsState.priceUp && 'bg-grayLColor/90'}`}
          onClick={() => {
            setBtnState('priceUp');
            sortButtonsState?.priceUp ? changeQuery('') : changeQuery('/search?sort=price%20asc');
          }}
        >
          <SortPriceUp />
        </div>
        <div
          className={`${iconClassesNormal} priceDown ${sortButtonsState.priceDown && 'bg-grayLColor/90'}`}
          onClick={() => {
            setBtnState('priceDown');
            sortButtonsState?.priceDown ? changeQuery('') : changeQuery('/search?sort=price%20desc');
          }}
        >
          <SortPriceDown />
        </div>
      </div>
    </div>
  );
}
