import { Dropdown } from './Dropdown';
import { ControlledInput } from './ControlledInput';
import { AddressProps } from '../../../lib/interfaces';

const Address = ({control, errors, isShippingAddressActive, register, setValue, isShipping, getValues, setBillingCountry, billingCountry}: AddressProps) => {
  const {house, city, street, postalCode} = getValues();

  return (
    <>
      <Dropdown control={control}
                errors={!isShippingAddressActive ? (isShipping ? errors.country2?.message : errors.country?.message) : errors.country?.message}
                name= {isShipping ? 'country2' : 'country'}
                isShippingAddressActive={isShippingAddressActive}
                isShipping={isShipping}
                billingValue={billingCountry}
                setBillingCountry={setBillingCountry}
      />
      <ControlledInput
        fieldName='City'
        register={register}
        errors={!isShippingAddressActive ? (isShipping ? errors.city2?.message : errors.city?.message) : errors.city?.message}
        setValue={setValue}
        placeholder='Type your city'
        disabled={isShipping && isShippingAddressActive}
        isShipping={isShipping}
        billingValue={city}
      />
      <ControlledInput
        fieldName='Street'
        register={register}
        errors={!isShippingAddressActive ? (isShipping ? errors.street2?.message : errors.street?.message) : errors.street?.message}
        setValue={setValue}
        placeholder='Type your street'
        disabled={isShipping && isShippingAddressActive}
        isShipping={isShipping}
        billingValue={street}
      />
      <ControlledInput
        fieldName='House'
        register={register}
        errors={!isShippingAddressActive ? (isShipping ? errors.house2?.message : errors.house?.message) : errors.house?.message}
        setValue={setValue}
        placeholder='Type your house'
        disabled={isShipping && isShippingAddressActive}
        isShipping={isShipping}
        billingValue={house}
      />
      <ControlledInput
        fieldName='Postal code'
        register={register}
        errors={!isShippingAddressActive ? (isShipping ? errors.postalCode2?.message : errors.postalCode?.message) : errors.postalCode?.message}
        setValue={setValue}
        placeholder='Type your postal code'
        disabled={isShipping && isShippingAddressActive}
        isShipping={isShipping}
        billingValue={postalCode}
      />
    </>
  );
};

export default Address;
