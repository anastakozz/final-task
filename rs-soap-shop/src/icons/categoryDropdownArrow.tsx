import { CategoryDropdownArrowProps } from '@interfaces';
import React, { useEffect, useState } from 'react';

export default function CategoryDropdownArrow({
  parentCategoryName,
  openedCategory,
  setOpenedCategory
}: CategoryDropdownArrowProps) {
  const [rotationAngle, setRotationAngle] = useState<string>('-90');

  useEffect(() => {
    parentCategoryName === openedCategory ? setRotationAngle('90') : setRotationAngle('-90');
  }, [openedCategory, parentCategoryName]);

  return (
    <svg
      width='30px'
      height='30px'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      style={{ transition: 'transform 0.3s ease', transform: `rotate(${rotationAngle}deg)` }}
      onClick={() => parentCategoryName === openedCategory ? setOpenedCategory(null) : setOpenedCategory(parentCategoryName)}
    >
      <g id='SVGRepo_blackgCarrier' strokeWidth='0'></g>
      <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g>
      <g id='SVGRepo_iconCarrier'>
        <path
          opacity='0.5'
          d='M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z'
          stroke='black'
          strokeWidth='1.5'
        ></path>
        <path
          d='M8.5 9L11.5 12L8.5 15'
          stroke='black'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        ></path>
        <path
          d='M12.5 9L15.5 12L12.5 15'
          stroke='black'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        ></path>
      </g>
    </svg>
  );
}
