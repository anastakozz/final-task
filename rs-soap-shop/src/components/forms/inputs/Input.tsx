import React, { ChangeEventHandler, useEffect, useState } from 'react';
import cn from 'classnames';
import { ShowPassword } from '../../../icons/showPassword';
import { HidePassword } from '../../../icons/hidePassword';
import { validateEmail } from '../validateFunctions/e-mail';
import { InputProps } from '../../../lib/interfaces';
import { validatePassword } from '../validateFunctions/password';
import { validateDate } from '../validateFunctions/date';
import { validateStreet } from '../validateFunctions/street';
import { validateCity } from '../validateFunctions/city';
import { validatePostalCode } from '../validateFunctions/postalCode';
import { validateName } from '../validateFunctions/name';

export const Input = ({
  name,
  label,
  type,
  placeholder,
  isSubmitted,
  onChange,
  val,
  disabled,
  isColumn,
  autoComplete
}: InputProps) => {
  const inputTailwind =
    'p-5 font-medium rounded-md w-full border border-slate-300 placeholder:opacity-60 dark:bg-graySColor dark:placeholder-black';

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = (): void => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const [value, setValue] = useState(val);
  const [error, setError] = useState('');

  function determineValidationError(type: string, value: string): string {
    switch (type) {
      case 'mail':
        return validateEmail(value);
      case 'password':
        return validatePassword(value);
      case 'date':
        return validateDate(value);
      case 'street':
        return validateStreet(value);
      case 'city':
        return validateCity(value);
      case 'postalCode':
        return validatePostalCode(value);
      case 'text':
        return validateName(value);
      default:
        return '';
    }
  }

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event): void => {
    const inputValue: string = event.target.value;
    setValue(inputValue);
    onChange(inputValue);
    if (type === 'mail') {
      const validationError: string = validateEmail(inputValue);
      setError(validationError);
    } else if (type === 'password') {
      const validationError: string = validatePassword(inputValue);
      setError(validationError);
    } else if (type === 'date') {
      const validationError: string = validateDate(inputValue);
      setError(validationError);
    } else if (type === 'street') {
      const validationError: string = validateStreet(inputValue);
      setError(validationError);
    } else if (type === 'city') {
      const validationError: string = validateCity(inputValue);
      setError(validationError);
    } else if (type === 'postalCode') {
      const validationError: string = validatePostalCode(inputValue);
      setError(validationError);
    } else if (type === 'text') {
      const validationError: string = validateName(inputValue);
      setError(validationError);
    }
  };

  useEffect((): void => {
    setValue(val);
  }, [val]);

  useEffect((): void => {
    if (isSubmitted) {
      const validationError: string = determineValidationError(type, value);
      setError(validationError);
    }
  }, [isSubmitted, type, value]);

  return (
    <div
      className={`flex flex-col w-full gap-2 md:justify-between md: mb-esm ${
        isColumn ? 'md:flex-col' : ' md:flex-row md:items-end'
      }`}
    >
      <div className='flex flex-col md:flex-row'>
        <label className='font-semibold text-h4 text-grayLColor dark:text-primaryColor whitespace-nowrap'>
          {label}
        </label>

        <div className={'w-inputs md:hidden text-red-500'}>{error}</div>
      </div>

      <div className={'w-inputs'}>
        <div className={'hidden md:inline-block text-errorColor'}>{error}</div>
        <div className='relative'>
          <input
            type={isPasswordVisible ? 'text' : type}
            className={cn(inputTailwind)}
            placeholder={placeholder}
            value={val}
            onChange={handleInputChange}
            disabled={disabled}
            autoComplete={autoComplete}
            name={name}
          />
          {type === 'password' && (
            <button
              type='button'
              onClick={togglePasswordVisibility}
              className='absolute right-4 top-7 focus:outline-none'
            >
              {isPasswordVisible ? <HidePassword /> : <ShowPassword />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
