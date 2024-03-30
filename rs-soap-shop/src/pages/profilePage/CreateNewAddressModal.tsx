import { useState } from 'react';
import AdditionalButton from '../../components/buttons/additionalButton';
import { cityValidation, postalCodeValidation, streetValidation } from '../../lib/utils/inputValidations';
import { Input } from '../../components/forms/inputs/Input';
import { updateAccountData } from '../../services/account.service';
import { AddressCardI } from '../../lib/interfaces';
import { dataAdapterToFullName } from '.';
import { validateCity } from '../../components/forms/validateFunctions/city';
import { validateStreet } from '../../components/forms/validateFunctions/street';
import { validatePostalCode } from '../../components/forms/validateFunctions/postalCode';

const countries = [
  {
    code: 'IT',
    country: 'Italy'
  },
  {
    code: 'ES',
    country: 'Spain'
  },
  {
    code: 'DE',
    country: 'Germany'
  }
];

export function dataAdapterToShortName(name: string): string {
  if (name) {
    return countries.find(el => el.country == name).code;
  }
}

type CreateNewAddressModalProps = {
  onClose: () => void;
  onSuccess: () => void;
  onError: (e: string) => void;
  address?: AddressCardI;
  account: {
    id: string;
    version: string;
    defaultBillingAddressId: string;
    defaultShippingAddressId: string;
    billingAddressIds: string[];
    shippingAddressIds: string[];
    checked: boolean;
  };
};

export default function CreateNewAddressModal({
  onClose,
  account,
  address,
  onSuccess,
  onError
}: CreateNewAddressModalProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [addressTypeUpdated, setAddressTypeUpdated] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(address ? dataAdapterToFullName(address?.country) : '');
  const [selectedCountryError, setSelectedCountryError] = useState(false);
  const [city, setCity] = useState(address ? address?.city : '');

  const [street, setStreet] = useState(address ? address?.streetName : '');

  const [house, setHouse] = useState(address ? address?.building : '');

  const [postalCode, setPostalCode] = useState(address ? address?.postalCode : '');

  const [isShippingAddress, setIsShippingAddress] = useState(
    address ? account.shippingAddressIds.includes(address.id) : true
  );
  const [isBillingAddress, setIsBillingAddress] = useState(
    address ? account.billingAddressIds.includes(address.id) : false
  );
  const isDefaultAddressInitial = address
    ? (account.shippingAddressIds.includes(address.id) && account.defaultShippingAddressId == address.id) ||
      (account.billingAddressIds.includes(address.id) && account.defaultBillingAddressId == address.id)
    : false;
  const [isDefaultAddress, setIsDefaultAddress] = useState(isDefaultAddressInitial);

  const actions = address
    ? [
        {
          action: 'changeAddress',
          addressId: address.id,
          address: {
            country: dataAdapterToShortName(selectedCountry),
            city: city,
            streetName: street,
            building: house,
            postalCode: postalCode
          }
        },
        ...(addressTypeUpdated
          ? [
              {
                action: isShippingAddress ? 'addShippingAddressId' : 'addBillingAddressId',
                addressId: address.id
              },
              {
                action: isShippingAddress ? 'removeBillingAddressId' : 'removeShippingAddressId',
                addressId: address.id
              }
            ]
          : []),
        ...(isDefaultAddress
          ? [
              {
                action: isShippingAddress ? 'setDefaultShippingAddress' : 'setDefaultBillingAddress',
                addressId: address.id
              }
            ]
          : [])
      ]
    : [
        {
          action: 'addAddress',
          address: {
            country: dataAdapterToShortName(selectedCountry),
            city: city,
            streetName: street,
            building: house,
            postalCode: postalCode
          }
        }
      ];

  const toggleAddressType = () => {
    setIsShippingAddress(!isShippingAddress);
    setIsBillingAddress(!isBillingAddress);
    if (address) {
      setAddressTypeUpdated(true);
    }
  };

  const validateFields = () => {
    setIsSubmitted(true);

    if (!selectedCountry) {
      setSelectedCountryError(true);
    }

    return !validateCity(city) && !validateStreet(street) && !!house && !validatePostalCode(postalCode);
  };

  const handleSave = () => {
    if (validateFields()) {
      if (address) {
        updateAccountData(account?.id, account?.version, actions)
          .then(() => {
            onClose();
            onSuccess();
          })
          .catch(() => {
            onError('Something went wrong');
          });
      } else {
        updateAccountData(account?.id, account?.version, actions)
          .then(resp => {
            const newAddresses = resp.data.addresses;
            const newAddresId: string = newAddresses[newAddresses.length - 1].id;
            const newAction = [
              {
                action: isShippingAddress ? 'addShippingAddressId' : 'addBillingAddressId',
                addressId: newAddresId
              }
            ];
            updateAccountData(account?.id, account?.version + 1, newAction).then(() => {
              if (!isDefaultAddress) {
                onClose();
                onSuccess();
              } else {
                const newDefaultAddressAction = [
                  {
                    action: isShippingAddress ? 'setDefaultShippingAddress' : 'setDefaultBillingAddress',
                    addressId: newAddresId
                  }
                ];
                updateAccountData(account?.id, account?.version + 2, newDefaultAddressAction).then(() => {
                  onClose();
                  onSuccess();
                });
              }
            });
          })
          .catch(() => {
            onError('Something went wrong');
          });
      }
    }
  };
  const handleCancel = () => {
    onClose();
  };
  return (
    <div data-testid='add-address-modal'>
      <div className='w-full h-full bg-grayLColor opacity-30 fixed z-10 top-0 left-0'></div>
      <div className='h-[600px] overflow-auto z-20 bg-secondaryColor dark:bg-grayLColor dark:text-secondaryColor fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-normal p-2 md:px-sm md:py-sm border-accentColor dark:border-secondaryColor border-8'>
        <div className={'flex'}>
          <input
            id={'setAsShipAddress'}
            type={'checkbox'}
            checked={isShippingAddress}
            onChange={toggleAddressType}
          ></input>
          <label
            className={'block ml-min font-semibold text-h5 text-grayLColor dark:text-primaryColor whitespace-nowrap'}
            htmlFor='setAsShipAddress'
          >
            Set as shipping address
          </label>
        </div>
        <div className={'flex'}>
          <input
            id={'setAsBillingAddress'}
            type={'checkbox'}
            checked={isBillingAddress}
            onChange={toggleAddressType}
          ></input>
          <label
            className={'block ml-min font-semibold text-h5 text-grayLColor dark:text-primaryColor whitespace-nowrap'}
            htmlFor='setAsBillingAddress'
          >
            Set as billing address
          </label>
        </div>

        <h4 className='text-h4 text-accentColor dark:text-basicColor mr-4'>Country:</h4>
        <div>
          {selectedCountryError && <p className='error-message text-errorColor'>Please select your country</p>}
          <select
            value={selectedCountry}
            onChange={e => {
              setSelectedCountry(e.target.value);
              setSelectedCountryError(false);
            }}
            className={
              selectedCountryError
                ? 'error p-5 font-medium rounded-md w-inputs border border-slate-300 placeholder:opacity-60 dark:bg-graySColor dark:placeholder-black'
                : 'p-5 font-medium rounded-md w-inputs border border-slate-300 placeholder:opacity-60 dark:bg-graySColor dark:placeholder-black'
            }
          >
            <option value='' disabled>
              Select your country
            </option>
            <option>Italy</option>
            <option>Spain</option>
            <option>Germany</option>
          </select>
        </div>

        <h4 className='text-h4 text-accentColor dark:text-basicColor mr-4'>City:</h4>
        <Input
          {...cityValidation}
          label=''
          isSubmitted={isSubmitted}
          isColumn={true}
          val={city}
          onChange={(newValue: string) => {
            setCity(newValue);
          }}
        />

        <h4 className='text-h4 text-accentColor dark:text-basicColor mr-4'>Street:</h4>
        <Input
          {...streetValidation}
          label=''
          isColumn={true}
          val={street}
          isSubmitted={isSubmitted}
          onChange={(newValue: string) => {
            setStreet(newValue);
          }}
        />

        <h4 className='text-h4 text-accentColor dark:text-basicColor mr-4'>Building:</h4>
        <Input
          {...streetValidation}
          label=''
          isColumn={true}
          val={house}
          isSubmitted={isSubmitted}
          placeholder='Type your house number'
          onChange={(newValue: string) => {
            setHouse(newValue);
          }}
        />

        <h4 className='text-h4 text-accentColor dark:text-basicColor mr-4'>Zip code:</h4>
        <Input
          {...postalCodeValidation}
          label=''
          isColumn={true}
          val={postalCode}
          isSubmitted={isSubmitted}
          onChange={(newValue: string) => {
            setPostalCode(newValue);
          }}
        />

        <div className={'flex'}>
          <input
            disabled={!!address && isDefaultAddressInitial}
            checked={isDefaultAddress}
            id={'setAsDefAddress'}
            type={'checkbox'}
            onChange={() => setIsDefaultAddress(!isDefaultAddress)}
          ></input>
          <label
            className={'block ml-min font-semibold text-h5 text-grayLColor dark:text-primaryColor whitespace-nowrap'}
            htmlFor='setAsDefAddress'
          >
            Set as default address
          </label>
        </div>
        <div className='flex flex-col md:flex-row items-center justify-center'>
          <AdditionalButton onClick={handleSave}>Save</AdditionalButton>
          <AdditionalButton onClick={handleCancel}>Cancel</AdditionalButton>
        </div>
      </div>
    </div>
  );
}
