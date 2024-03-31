import CategoryDropdownArrow from '@icons/categoryDropdownArrow';
import { parentCategoryProps } from '@interfaces';
import { useNavigate } from 'react-router-dom';

export default function ParentCategory({
  onSelectCategory,
  category,
  parentCategoryName,
  setOpenedCategory,
  handleCategoryClick,
  openedCategory
}: parentCategoryProps) {
  const navigate = useNavigate();
  return (
    <div
      className={'flex justify-between px-4 py-2'}
      onClick={() => {
        onSelectCategory(parentCategoryName);
        navigate(`/our-products/${parentCategoryName.toLocaleLowerCase()}`);
      }}
    >
      <div className={category == parentCategoryName.toLocaleLowerCase() ? 'text-accentColor' : ''}>{parentCategoryName}</div>
      <div
        onClick={event => {
          event.stopPropagation();
          handleCategoryClick();
        }}
      >
        {!['sale', 'new'].includes(parentCategoryName) && (
          <CategoryDropdownArrow
            parentCategoryName={parentCategoryName}
            openedCategory={openedCategory}
            setOpenedCategory={setOpenedCategory}
          />
        )}
      </div>
    </div>
  );
}
