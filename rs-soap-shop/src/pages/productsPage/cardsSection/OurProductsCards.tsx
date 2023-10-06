import React, { ReactNode, useEffect, useState } from 'react';
import Card from '@components/card';
import { OurProductsCardsProps, ProductCardProps } from '@interfaces';
import { adaptCardsData } from './getDataForCards';

export default function OurProductsCards({ products }: OurProductsCardsProps) {
  const [items, setItems] = useState<ProductCardProps[] | undefined>(undefined);
  const [isDataLoading, setDataLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await adaptCardsData(products);
      return data;
    };

    if (!isDataLoading) {
      setDataLoading(true);

      fetchData()
        .then(data => {
          setItems(data);
        })
        .catch(e => {
          console.log(e);
        })
        .finally(() => {
          setDataLoading(false);
        });
    }
  }, [products]);

  return (
    <>
      {items ? (
        <div className='bg-primaryColor dark:bg-grayMColor h-auto p-sm text-center px-big flex flex-col flex-1 items-center'>
          <div className='flex flex-wrap justify-center md:justify-between mt-sm max-w-[1245px] pb-sm'>
            {items.length === 0 ? (
              <p>No products to show...</p>
            ) : (
              items.map((item: ProductCardProps, index: number): ReactNode => {
                return (
                  <div key={index} className='mb-sm mx-4'>
                    <Card {...item} />
                  </div>
                );
              })
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
