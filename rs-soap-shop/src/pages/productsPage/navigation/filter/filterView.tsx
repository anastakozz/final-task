import { RadioButtons } from './components/radioButtons';
import { PriceFilter } from './components/PriceFilter';
import FilterButton from './components/filterButton';
import { useState, ChangeEvent } from 'react';
import FilterIcon from '../../../../icons/filterIcon';
import { iconClassesActive, iconClassesNormal } from '../../../../lib/constants';
import { OurProductsCardsProps } from '../../../../lib/interfaces';
import classNames from 'classnames';

export default function FilterView({ changeQuery }: OurProductsCardsProps) {
  const [isOn, setIsOn] = useState(false);
  const [isFiltered, setFilter] = useState(false);
  const [startMinPrice, setMinPrice] = useState('0');
  const [startMaxPrice, setMaxPrice] = useState('50');

  const minPriceInput = document.querySelector('.min-price') as HTMLInputElement;
  const maxPriceInput = document.querySelector('.max-price') as HTMLInputElement;
  const productCheck = document.querySelector('.product-check') as HTMLInputElement;
  const setCheck = document.querySelector('.set-check') as HTMLInputElement;

  function toggleFilterMenu() {
    setIsOn(!isOn);
  }

  function handleFilterClick() {
    toggleFilterMenu();
    setFilter(true);
    const filterOptions = generateFilterQuery(true);
    changeQuery(filterOptions);
  }

  function handleResetClick() {
    toggleFilterMenu();
    setFilter(false);
    productCheck.checked = false;
    setCheck.checked = false;
    setMinPrice('0');
    setMaxPrice('50');
    changeQuery('');
  }

  function generateFilterQuery(filter: boolean): string {
    const minPrice = +minPriceInput.value * 100;
    const maxPrice = +maxPriceInput.value * 100;
    const isProductChecked = productCheck.checked;
    const isSetChecked = setCheck.checked;

    if (filter) {
      let searchQuery = `filter=variants.price.centAmount:range (${minPrice} to ${maxPrice})`;
      if (isProductChecked && isSetChecked) {
        searchQuery += '&filter=searchKeywords.en.text:"single","set"';
      } else if (isProductChecked) {
        searchQuery += '&filter=searchKeywords.en.text:"single"';
      } else if (isSetChecked) {
        searchQuery += '&filter=searchKeywords.en.text:"set"';
      }

      return searchQuery;
    }
    return '';
  }

  const handleMinPriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue: string = event.target.value;
    if (
      (newValue === '' || (newValue !== '' && parseFloat(newValue) <= parseFloat(startMaxPrice))) &&
      parseFloat(newValue) <= 50 &&
      parseFloat(newValue) >= 0
    ) {
      setMinPrice(newValue);
    }
  };

  const handleMaxPriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue: string = event.target.value;
    if (
      (newValue === '' || (newValue !== '' && parseFloat(newValue) >= parseFloat(startMinPrice))) &&
      parseFloat(newValue) <= 50 &&
      parseFloat(newValue) >= 0
    ) {
      setMaxPrice(newValue);
    }
  };

  return (
    <div className='relative text-basicColor'>
      <div
        role='toggler'
        className='transition flex items-center gap-[0.5rem] text-primaryColor cursor-pointer hover:text-basicColor active:scale-95'
        onClick={toggleFilterMenu}
      >
        <div className={isFiltered ? `${iconClassesActive}` : `${iconClassesNormal}`}>
          <FilterIcon />
        </div>

        <div className='hidden md:block'>Filter</div>
      </div>
      <div role='filter-menu' className={isOn ? 'visible' : 'invisible'}>
        <div
          className={classNames(
            'flex flex-col justify-between',
            'absolute z-40 left-0 add:left-auto add:right-0 top-11 py-[10px] px-2 add:px-sm add:min-w-[170px] min-h-[172px]',
            'drop-shadow-lg bg-primaryColor rounded-md ring-1 ring-black ring-opacity-5',
            'text-sm text-grayMColor'
          )}
        >
          <div className={'text-h5 my-2'}>Filter settings</div>
          <div className={'flex gap-[1rem] flex-wrap md:flex-nowrap'}>
            <div className={'flex flex-col'}>
              <RadioButtons />
            </div>
            <PriceFilter
              {...{
                startMinPrice: startMinPrice,
                startMaxPrice: startMaxPrice,
                callbackMin: handleMinPriceChange,
                callbackMax: handleMaxPriceChange
              }}
            />
            <div className={'flex flex-col justify-between gap-[1rem]'}>
              <FilterButton
                role='filter-button'
                onClick={() => {
                  handleFilterClick();
                }}
              >
                Filter
              </FilterButton>
              <FilterButton
                role='reset-button'
                onClick={() => {
                  handleResetClick();
                }}
              >
                Reset
              </FilterButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
