import React, { useEffect, useState } from 'react';
import { Product } from '@interfaces';
import DeleteIcon from '../../icons/deleteIcon';
import { updateProductInCart } from '@services/cart.service';
import { NavLink } from 'react-router-dom';

export function CartListItem({
  token,
  el,
  cartId,
  version,
  onUpdate
}: {
  token: string;
  el: Product;
  cartId: string;
  version: number;
  onUpdate: () => Promise<void>;
}) {
  const [item, setItem] = useState({
    quantity: el.quantity,
    disabled: false
  });
  console.log(el);

  const onDelete = (lineItemId: string) => {
    setItem({
      ...item,
      disabled: true
    });
    const actions = [
      {
        action: 'changeLineItemQuantity',
        lineItemId: lineItemId,
        quantity: 0
      }
    ];
    updateProductInCart(token, cartId, actions, version).then(() => {
      onUpdate();
    });
  };

  useEffect(() => {
    setItem({
      quantity: el.quantity,
      disabled: false
    });
  }, [version]);

  const onChangeAmount = (lineItemId: string, quantity: number) => {
    setItem(() => ({
      quantity: quantity,
      disabled: true
    }));

    const actions = [
      {
        action: 'changeLineItemQuantity',
        lineItemId: lineItemId,
        quantity: quantity
      }
    ];

    updateProductInCart(token, cartId, actions, version).then(() => {
      onUpdate();
    });
  };

  return (
    <div className='p-4 border-2 border-dotted border-accentColor dark:border-basicColor rounded-normal w-full mb-4 flex flex-col md:flex-row items-start md:items-center justify-between'>
      <div className='flex items-center  justify-start mb-4 md:mb-0'>
        <div className='border-2 border-accentColor dark:border-basicColor rounded-normal overflow-hidden flex justify-center items-center w-[100px] h-[100px] shrink-0 mr-4'>
          <img className='w-full h-full object-cover' src={el.variant.images[0].url} alt=''></img>
        </div>
        <NavLink to={`/product/${el.productKey}`}>
          <h3 className='text-accentColor dark:text-basicColor font-bold mr-2 text-center md:text-start hover:text-accentDarkColor dark:hover:text-accentDarkColor'>
            {el.name.en}
          </h3>
          {el.price.discounted && (
            <div className={'mt-2 px-2 py-1 h-min bg-red-500/90 text-primaryColor font-bold inline-block'}>SALE</div>
          )}
        </NavLink>
      </div>
      <div className='flex items-center flex-wrap'>
        <div>
          {el.discountedPrice ? (
            <>
              <p className='line-through text-grayMColor dark:accent-accentColor mr-4'>
                {(el.price.value.centAmount / 100).toLocaleString('en-US', {
                  style: 'currency',
                  currency: el.price.value.currencyCode
                })}
              </p>

              <p className='mr-4'>
                {(el.discountedPrice.value.centAmount / 100).toLocaleString('en-US', {
                  style: 'currency',
                  currency: el.discountedPrice.value.currencyCode
                })}
              </p>
            </>
          ) : (
            <p className='mr-4'>
              {(el.price.value.centAmount / 100).toLocaleString('en-US', {
                style: 'currency',
                currency: el.price.value.currencyCode
              })}
            </p>
          )}
        </div>
        <div className='flex mr-4'>
          <button
            disabled={item.disabled}
            onClick={() => {
              onChangeAmount(el.id, item.quantity > 1 ? item.quantity - 1 : item.quantity);
            }}
            className='cursor-pointer flex justify-center items-center w-[20px] bg-graySColor hover:bg-grayMColor transition'
          >
            -
          </button>
          <input
            onChange={e => {
              console.log(e.target.value);
            }}
            className='w-[30px] text-center'
            type='text'
            value={item.quantity}
          />

          <button
            disabled={item.disabled}
            onClick={() => {
              onChangeAmount(el.id, item.quantity + 1);
            }}
            className='cursor-pointer flex justify-center items-center w-[20px] bg-graySColor hover:bg-grayMColor transition'
          >
            +
          </button>
        </div>
        <p className='font-bold mr-2'>
          {(el.totalPrice.centAmount / 100).toLocaleString('en-US', {
            style: 'currency',
            currency: el.totalPrice.currencyCode
          })}
        </p>

        <button disabled={item.disabled} onClick={() => onDelete(el.id)}>
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
}
