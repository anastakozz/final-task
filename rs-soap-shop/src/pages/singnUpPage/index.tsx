import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import scrollToTop from '../../lib/utils/scrollToTop';
import { TokenNames } from '@enums';
import { ControlledInput } from '@components/forms/newFormComponents/ControlledInput';
import Address from '../../components/forms/newFormComponents/Address';
import { Controller, useForm } from 'react-hook-form';
import ResultMessage from '../../components/ResultMessage';
import ButtonForm from '../../components/forms/buttonForm';
import { ILoginResolver, RegistrationData, ResultProps } from '@interfaces';
import { yupResolver } from '@hookform/resolvers/yup';
import { registrationSchema, withoutShippingSchema } from '@utils/validationSchema';
import { defaultInputsValues } from '../../lib/validationLib';
import { handleRegistration } from '@services/handleRegistration';

function SignUpPage() {
  const navigate = useNavigate();
  useEffect(() => {
    scrollToTop();
    if (localStorage.getItem(`${TokenNames.userToken}`)) {
      navigate('/');
    }
  }, []);

  const [billingCountry, setBillingCountry] = useState('');
  const [isShippingAddressActive, setIsShippingAddressActive] = useState(false);

  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<ILoginResolver>({
    mode: 'onChange',
    resolver: isShippingAddressActive ? yupResolver(withoutShippingSchema) : yupResolver(registrationSchema),
    defaultValues: defaultInputsValues,
  });

  const [submitResult, setSubmitResult] = useState<ResultProps>({
    isSuccess: false,
    message: '',
    isVisible: false
  });

  function adaptData(): RegistrationData {
    const data = getValues();

    return {
      firstName: data.firstName,
      secondName: data.secondName,
      email: data.email,
      password: data.password,
      date: data.date.toLocaleString(),
      billingAddress: {
        country: data.country,
        city: data.city,
        street: data.street,
        house: data.house,
        postalCode: data.postalCode,
        isDefault: data.isDefaultBillingAddress,
      },
      shippingAddress: {
        country: isShippingAddressActive ? data.country : data.country2,
        city: isShippingAddressActive ? data.city : data.city2,
        street: isShippingAddressActive ? data.street : data.street2,
        house: isShippingAddressActive ? data.house : data.house2,
        postalCode: isShippingAddressActive ? data.postalCode : data.postalCode2,
        isDefault: data.isDefaultShippingAddress,
      }
    };
  }

  const onSubmit = async () => {
    const data = adaptData();
    const result = await handleRegistration(data);
    if (result) {
      result.disableRedirect = false;
      result.isVisible = true;
      setSubmitResult(result);
    } else {
      const errorResult = {
        isSuccess: false,
        message: 'Ooops. Something went wrong. Please, check if all fields are filled properly ',
        isVisible: true
      };
      setSubmitResult(errorResult);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='bg-secondaryColor dark:bg-grayMColor'>
      <div className='container px-sm py-sm md:px-big md:py-bigY max-w-[1440px] mx-auto lg:px-big'>
        <h3 className={'text-accentColor dark:text-primaryColor text-h3 font-bold pb-bigY'}>Registration form:</h3>
        <div className={'md:w-form'}>
          <div className={'md:flex justify-between'}>
            <ControlledInput
              fieldName='First name'
              register={register}
              errors={errors.firstName?.message}
              placeholder='Type your first name'
              setValue={setValue}
            />
            <ControlledInput
              fieldName='Second name'
              register={register}
              errors={errors.secondName?.message}
              placeholder='Type your second name'
              setValue={setValue}
            />
          </div>
          <ControlledInput
            fieldName='Date of birth'
            register={register}
            errors={errors.date?.message}
            type='date'
            setValue={setValue}
            placeholder=''
          />
          <ControlledInput
            fieldName='Email'
            register={register}
            errors={errors.email?.message}
            type='email'
            setValue={setValue}
            placeholder='Type your e-mail'
          />
          <ControlledInput
            fieldName='Password'
            register={register}
            errors={errors.password?.message}
            type='password'
            setValue={setValue}
            placeholder='Type your password'
          />
          <ControlledInput
            fieldName='Confirm password'
            register={register}
            errors={errors.confirmPassword?.message}
            type='password'
            setValue={setValue}
            placeholder='Confirm your password'
          />
          <h4 className={'text-h4 text-grayLColor dark:text-primaryColor font-bold my-sm text-center'}>
            Your billing address
          </h4>
          <Address control={control}
                   errors={errors}
                   isShippingAddressActive={isShippingAddressActive}
                   register={register}
                   setValue={setValue}
                   isShipping={false}
                   getValues={getValues}
                   billingCountry={billingCountry}
                   setBillingCountry={setBillingCountry}
          />

          <div className={'mb-esm'}>
            <div className={'flex md:ml-[250px]'}>
              <label className={'block font-semibold text-h5 text-grayLColor dark:text-primaryColor whitespace-nowrap'}>
                <Controller
                  name='isDefaultBillingAddress'
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <>
                      <input
                        className={'mr-min'}
                        type='checkbox'
                        onChange={e => field.onChange(e.target.checked)}
                        onBlur={field.onBlur}
                        checked={field.value}
                      />
                      Set as default address
                    </>
                  )}
                />
              </label>
            </div>
          </div>

          <div className={'flex md:ml-[250px]'}>
            <input id={'setAsShipAddress'}
                   type={'checkbox'}
                   onClick={() => setIsShippingAddressActive(prevState => !prevState)}>

            </input>
            <label
              className={
                'block ml-min font-semibold text-h5 text-grayLColor dark:text-primaryColor whitespace-nowrap'
              }
              htmlFor='setAsShipAddress'
            >
              Set as shipping address
            </label>
          </div>
          <h4 className={'text-h4 text-grayLColor dark:text-primaryColor font-bold my-sm text-center'}>
            Your shipping address
          </h4>

          <Address control={control}
                   errors={errors}
                   isShippingAddressActive={isShippingAddressActive}
                   register={register}
                   setValue={setValue}
                   isShipping={true}
                   getValues={getValues}
                   billingCountry={billingCountry}
                   setBillingCountry={setBillingCountry}
          />

          <div className={'flex md:ml-[250px]'}>
            <div className={'flex flex-row-reverse'}>
              <label className={'block font-semibold text-h5 text-grayLColor dark:text-primaryColor whitespace-nowrap'}>
                <Controller
                  name='isDefaultShippingAddress'
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <>
                      <input
                        className={'mr-min'}
                        type='checkbox'
                        onChange={e => field.onChange(e.target.checked)}
                        onBlur={field.onBlur}
                        checked={field.value}
                      />
                      Set as default address
                    </>
                  )}
                />
              </label>
            </div>
          </div>
          <div className={'my-sm'}>
            <button type={'submit'}
                    className='transition inline-flex whitespace-nowrap items-center text-accentColor dark:text-secondaryColor border-2 border-accentColor
                    dark:border-secondaryColor hover:text-secondaryColor dark:hover:text-grayLColor font-bold bg-none hover:bg-accentColor
                    dark:hover:bg-secondaryColor rounded-normal h-[74px] px-12 active:scale-95'
            >CREATE AN ACCOUNT
            </button>
          </div>
          <ResultMessage {...submitResult}></ResultMessage>
          <p className={'text-h4 font-semibold text-grayLColor dark:text-primaryColor'}>
            Do you already have an account?
          </p>
          <div className={'my-sm'}>
            <ButtonForm to={'/sign-in'}>SIGN IN</ButtonForm>
          </div>
        </div>
      </div>
    </form>
  );
}

export default SignUpPage;
