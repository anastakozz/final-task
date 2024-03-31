import React from 'react';

function LoadingSpinner() {
  return (
    <div className={'bg-primaryColor h-auto p-sm text-center px-big flex flex-col flex-1 items-center dark:bg-grayMColor'}>
      <div className='loader mt-[20px] mb-[20px]'></div>
    </div>
  );
}

export default LoadingSpinner;
