import React from 'react';
import { IDropDown } from '../../../lib/interfaces';
import { Controller } from 'react-hook-form';

export function Dropdown({control, errors, name, isShippingAddressActive, isShipping, billingValue, setBillingCountry}: IDropDown) {
  return (
    <div className={'md:flex mb-esm md:justify-between items-end'}>
      <label
        className={'font-semibold text-h4 text-grayLColor dark:text-primaryColor whitespace-nowrap'}
        htmlFor='billingOptions'
      >
        Your country:
      </label>
      <div>
        <p className='error-message text-errorColor'>{errors}</p>
        <Controller
          name={name}
          control={control}
          defaultValue={''}
          render={({ field }) => (
            <select
              value={field.value}
              onChange={e => {
                field.onChange(e);
                if (!isShipping) setBillingCountry(e.target.value);
              }}
              disabled={isShippingAddressActive && isShipping}
              className={
                errors
                  ? 'error p-5 font-medium rounded-md w-inputs border border-slate-300 placeholder:opacity-60 dark:bg-graySColor dark:placeholder-black'
                  : `p-5 font-medium rounded-md w-inputs border border-slate-300 placeholder:opacity-60 dark:bg-graySColor dark:placeholder-black ${
                      isShippingAddressActive && isShipping && 'cursor-not-allowed'
                    }`
              }
            >
              {isShipping && isShippingAddressActive ? (
                  <option value={billingValue}>{billingValue}</option>
              ) : (
                <>
                  <option value='' disabled>Select your country</option>
                  <option value='Italy'>Italy</option>
                  <option value='Spain'>Spain</option>
                  <option value='Germany'>Germany</option>
                </>
              )}
            </select>
          )}
        />
      </div>
    </div>
  );
}

