import classNames from 'classnames';
import Banner from '@components/banner';

export default function NewCollectionSection() {
  return (
    <div
      className={classNames(
        'xxl:min-h-[746px] p-sm md:p-big relative',
        'bg-new-collection bg-no-repeat bg-left bg-cover',
        'flex flex-row-reverse'
      )}
    >
      <Banner
        {...{
          label: 'New Arrival',
          title: 'Discover Our New Collection',
          description: 'Handmade soap in the form of flowers and food',
          buttonText: 'BUY NOW',
          linkAdress: '/our-products/new'
        }}
      />
    </div>
  );
}
