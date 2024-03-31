import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import scrollToTop from '../../lib/utils/scrollToTop';
import { TokenNames } from '@enums';
import { ControlledInput } from '@components/forms/newFormComponents/ControlledInput';
import ButtonForm from '../../components/forms/buttonForm';
import { useForm } from 'react-hook-form';
import { ILoginResolver } from '@interfaces';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '@utils/validationSchema';
import { defaultInputsValues } from '../../lib/validationLib';
import { getToken, login } from '@services/login.service';

const { userToken, userTokenRefresh } = TokenNames;

function SingInPage() {
  const navigate = useNavigate();

  useEffect(() => {
    scrollToTop();
    if (localStorage.getItem(`${TokenNames.userToken}`)) {
      navigate('/');
    }
  }, []);

  const [error, setError] = useState(null);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm<ILoginResolver>({
    mode: 'onChange',
    resolver: yupResolver(loginSchema),
    defaultValues: defaultInputsValues
  });

  const onSubmit = (data: ILoginResolver) => {
    const {email, password} = data;
    getToken(email, password)
      .then(resp => {
        const authData = resp.data;
        localStorage.setItem(`${userToken}`, JSON.stringify(authData));
        localStorage.setItem(`${userTokenRefresh}`, authData.refresh_token);
        login(email, password)
          .then(resp => {
            const userData = resp?.data;
            if (userData) {
              localStorage.setItem('user', JSON.stringify(userData));
              localStorage.setItem('isUser', 'true');
            }
          })
          .catch(err => {
            console.log(err);
          })
          .finally(() => {
            navigate('/');
          });
      })
      .catch(err => {
        console.error(err);
        if (err.response.data.error == 'invalid_customer_account_credentials') {
          setError(err.response.data.error_description);
        }
      });
  };

  return (
    <form className="bg-secondaryColor dark:bg-grayMColor flex-1" onSubmit={handleSubmit(onSubmit)}>
      <div className="container px-sm py-sm md:px-big md:py-bigY max-w-[1440px] mx-auto lg:px-big">
        <h3 className={'text-accentColor dark:text-primaryColor text-h3 font-bold pb-bigY'}>Sign In form:</h3>
        {error && (
          <div className="bg-errorColor p-4 rounded-md mb-8 flex">
            <img src="/images/attention-circle-svgrepo-com.svg" alt="" width="24px" className="mr-4" />
            <p>{error}</p>
          </div>
        )}
        <div className={'md:w-form'}>
          <ControlledInput
            fieldName="Email"
            register={register}
            errors={errors.email?.message}
            type="email"
            setValue={setValue}
            placeholder="Type your e-mail"
          />
          <ControlledInput
            fieldName="Password"
            register={register}
            errors={errors.password?.message}
            type="password"
            setValue={setValue}
            placeholder="Type your password"
          />
        </div>
        <div className={'my-sm'}>
          <button type={'submit'}
                  className='transition inline-flex whitespace-nowrap items-center text-accentColor dark:text-secondaryColor border-2 border-accentColor
                    dark:border-secondaryColor hover:text-secondaryColor dark:hover:text-grayLColor font-bold bg-none hover:bg-accentColor
                    dark:hover:bg-secondaryColor rounded-normal h-[74px] px-12 active:scale-95'
          >SIGN IN
          </button>
        </div>
        <p className={'text-h4 dark:text-primaryColor font-semibold text-grayLColor'}>
          Don&apos;t have an account yet?
        </p>
        <div className={'my-sm'}>
          <ButtonForm to={'/sign-up'}>CREATE AN ACCOUNT</ButtonForm>
        </div>
      </div>
    </form>
  )
}

export default SingInPage;
