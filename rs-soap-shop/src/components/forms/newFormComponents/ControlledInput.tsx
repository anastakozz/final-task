import React, { ChangeEvent, useState } from 'react';
import { IControlledInputContainer } from '../../../lib/interfaces';
import { ValidFieldNames } from '../../../lib/types';
import { HidePassword } from '../../../icons/hidePassword';
import { ShowPassword } from '../../../icons/showPassword';
import { validationNames } from '../../../lib/validationLib';

export function ControlledInput({
   fieldName,
   register,
   errors,
   type,
   placeholder,
   setValue,
   disabled,
   isShipping,
  billingValue
  }: IControlledInputContainer) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const isNamesInput = ['First name', 'Second name'].includes(fieldName);
  const currentFieldName = isShipping ?
    `${fieldName}2` as keyof typeof validationNames :
    fieldName as keyof typeof validationNames;
  let registerParams = validationNames[currentFieldName] as ValidFieldNames;
  if (fieldName === 'Confirm password') {
    registerParams = 'confirmPassword';
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setValue(registerParams, value, { shouldValidate: true });
  };

  return (
    <div
      className={`flex flex-col gap-2 md:justify-between md: mb-esm md:flex-row 
      ${isNamesInput ? 'md:flex-col md:items-start md:w-[250px]' : 'md:items-end w-full'}`
    }
    >
      <div className='flex flex-col md:flex-row'>
        <label className='font-semibold text-h4 text-grayLColor dark:text-primaryColor whitespace-nowrap'>
          {fieldName}:
        </label>
        <div className={'w-inputs md:hidden text-errorColor'}>{errors}</div>
      </div>

      <div className={isNamesInput ? 'w-[300px] md:w-[250px]' : 'w-inputs'}>
        <div className={'hidden md:inline-block text-errorColor h-[41px]'}>{errors}</div>
        <div className="relative">
          <input
            placeholder={placeholder}
            className={`p-5 font-medium rounded-md w-full border border-slate-300 placeholder:opacity-60 dark:bg-graySColor dark:placeholder-black ${disabled && 'cursor-not-allowed'}`}
            type={isPasswordVisible ? 'text' : type}
            {...register(registerParams)}
            value={disabled ? billingValue : inputValue}
            onChange={handleChange}
            disabled={disabled}
          />
          {type === 'password' && (
            <button
              type="button"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              className="absolute right-4 top-7 focus:outline-none"
            >
              {isPasswordVisible ? <HidePassword /> : <ShowPassword />}
            </button>
          )}
        </div>
      </div>
    </div>
)
  ;
}
