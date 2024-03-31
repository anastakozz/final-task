import CarouselDefault from '../carousel';
import { useEffect } from 'react';
import scrollToTop from '@utils/scrollToTop';
import classNames from 'classnames';

export default function SliderModal(modal: { paths: string[] }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    scrollToTop();
    return () => {
      document.body.style.overflow = 'visible';
    };
  });
  return (
    <>
      <div className='bg-grayLColor/90 h-full w-full z-[60] absolute top-0 left-0 back'></div>
      <div className='absolute z-[70] top-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[90%]'>
        {modal.paths.length === 1 ? (
          <img src={modal.paths[0]} className='object-contain h-full w-full'></img>
        ) : (
          <CarouselDefault {...{ paths: modal.paths, classes: 'object-contain h-full w-full' }}></CarouselDefault>
        )}
      </div>
      <div
        className={classNames(
          'transition closing-icon absolute top-5 right-5 z-[80]',
          'font-bold text-primaryColor hover:text-accentColor cursor-pointer'
        )}
      >
        CLOSE
      </div>
    </>
  );
}
