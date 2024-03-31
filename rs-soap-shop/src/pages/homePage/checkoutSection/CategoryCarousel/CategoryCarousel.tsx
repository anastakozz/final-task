import React, { useState, ReactNode } from 'react';
import ArrowIcon from '@icons/arrowIcon';
import { CategoryCardProps } from '@interfaces';
import CategoryCard from './CategoryCard';

const items: CategoryCardProps[] = [
  { name: 'Candles', path: './images/candle.png', link: '/our-products/decor/candles' },
  { name: 'Soap', path: './images/soap.png', link: '/our-products/self-care/soap' },
  { name: 'Scrubs', path: './images/scrub.png', link: '/our-products/self-care/scrub' },
  { name: 'Aroma sachet', path: './images/sachet.png', link: '/our-products/decor/aroma-sachet' },
  { name: 'Bath bombs', path: './images/bombs.png', link: '/our-products/self-care/bath-bomb' }
];
const moveForward = 'animate-[slide_0.3s_linear_both]';
const moveBackwards = 'animate-[slideBack_0.3s_linear_both]';

export default function CategoryCarousel() {
  const length = items.length;
  const [index, setIndex] = useState(0);
  const [animation, setAnimation] = useState<string>('');
  const itemsToShow = Array(length)
    .fill(index)
    .map((item, index) => {
      const newValue = item + index;
      if (newValue >= items.length) {
        return item + index - length;
      }
      return newValue;
    });

  const handlePrevious = () => {
    setAnimation(moveBackwards);
    setTimeout(() => {
      const newIndex = index - 1;
      setAnimation('');
      setIndex(newIndex < 0 ? length - 1 : newIndex);
    }, 300);
  };

  const handleNext = () => {
    setAnimation(moveForward);
    setTimeout(() => {
      const newIndex = index + 1;
      setAnimation('');
      setIndex(newIndex >= length ? 0 : newIndex);
    }, 300);
  };

  return (
    <div data-testid='carousel' className='flex justify-center md:m-esm mt-4 flex-wrap gap-4 pt:flex-nowrap'>
      <button data-testid='prev-button' onClick={handlePrevious} className='mr-4'>
        <ArrowIcon />
      </button>
      <div className='overflow-hidden w-[350px] xl:w-[1050px] order-first pt:order-none'>
        <div className={`${animation} flex justify-around w-full py-4`}>
          {itemsToShow.map((elem, index): ReactNode => {
            return (
              <div className='hover:scale-105 transition' key={`category-card ${index}`}>
                <CategoryCard {...items[elem]} />
              </div>
            );
          })}
        </div>
      </div>

      <button data-testid='next-button' onClick={handleNext} className='transform rotate-180 ml-4'>
        <ArrowIcon />
      </button>
    </div>
  );
}
