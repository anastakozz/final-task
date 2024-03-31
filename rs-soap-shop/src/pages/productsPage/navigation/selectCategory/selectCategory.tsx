import React, { useEffect, useState } from 'react';
import { DropdownIcon } from '../../../../icons/dropdownIcon';
import classNames from 'classnames';
import { getCategories } from '../../../../services/category.service';
import SubCategory from './dropdownMenu';
import ParentCategory from './parentCategory';
import { NavigationViewProps, Product } from '../../../../lib/interfaces';

export const SelectCategory = ({ nav }: NavigationViewProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);
  const [openedCategory, setOpenedCategory] = useState('');
  const [parentCategories, setParentCategories] = useState([]);
  const [childrenCategories, setChildrenCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      const categories: Product [] = await getCategories();
      categories.forEach(category => {
        category.ancestors.length > 0 ? setChildrenCategories((prevState) => [...prevState, category.name.en]) : setParentCategories((prevState) => [...prevState, category.name.en]);
      })

    }

    fetchCategories();
  }, []);

  const selectCategory = (category: string) => {
    setIsOpen(prevState => !prevState)
    setSelectedCategory(category);
  };

  useEffect(() => {
    let breadcrumpCategory;
    if (nav.subcategory) {
      breadcrumpCategory = nav.subcategory;
    } else if (nav.category) {
      breadcrumpCategory = nav.category;
    } else if (nav) {
      breadcrumpCategory = 'Select a category';
    }
    setSelectedCategory(breadcrumpCategory);
  }, [nav]);

  return (
    <div className='relative'>
      <div>
        <button
          type='button'
          className={classNames(
            'inline-flex justify-between',
            'w-[170px] px-2 py-2',
            'text-sm font-medium text-grayLColor',
            'bg-white border border-grayMColor rounded-md shadow-sm hover:bg-gray-50',
            'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accentDarkColor dark:focus:ring-accentColor'
          )}
          onClick={() => setIsOpen(prevState => !prevState)}
        >
          {selectedCategory || 'Select a category'}
          <DropdownIcon />
        </button>
      </div>

      {isOpen && (
        <div className='z-20 w-[170px] origin-top-left absolute left-0 mt-2 rounded-md drop-shadow-lg bg-primaryColor ring-1 ring-black ring-opacity-5'>
          <div className='py-1' role='menu' aria-orientation='vertical' aria-labelledby='options-menu'>
            {parentCategories.map((parentCategory: string) => {
              const isCategoryOpen = openedCategory === parentCategory && isDropdownOpened;

              const handleCategoryClick = () => {
                setIsDropdownOpened(!isCategoryOpen);
                isCategoryOpen ? setOpenedCategory('') : setOpenedCategory(parentCategory);
              };

              return (
                <button
                  key={parentCategory}
                  className='relative block text-sm text-grayMColor w-full text-left hover:bg-gray-200'
                  role='menuitem'
                >
                  <>
                    <ParentCategory
                      onSelectCategory={selectCategory}
                      category={nav.category}
                      parentCategoryName={parentCategory}
                      setOpenedCategory={setOpenedCategory}
                      handleCategoryClick={handleCategoryClick}
                      openedCategory={openedCategory}
                    />
                    {openedCategory === parentCategory && isDropdownOpened ? (
                      <SubCategory
                        onSelectCategory={selectCategory}
                        isDropdownOpened={isDropdownOpened}
                        openedCategory={openedCategory}
                      />
                    ) : null}
                  </>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
