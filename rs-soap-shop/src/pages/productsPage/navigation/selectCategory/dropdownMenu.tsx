import classNames from 'classnames';
import React from 'react';
import { Decor, SelfCare } from './childrenCategories';
import { SubCategoryProps } from '@interfaces';

export default function SubCategory({ isDropdownOpened, openedCategory, onSelectCategory }: SubCategoryProps) {
  return (
    <div
      className={classNames('left-40 mx-4 my-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20', {
        hidden: !isDropdownOpened
      })}
    >
      {openedCategory === 'Decor' ? (
        <Decor onSelectCategory={onSelectCategory} />
      ) : (
        <SelfCare onSelectCategory={onSelectCategory} />
      )}
    </div>
  );
}
