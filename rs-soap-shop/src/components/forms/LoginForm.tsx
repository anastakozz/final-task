import { emailValidation, passwordValidation } from '../../lib/utils/inputValidations'
import React, { useState } from 'react'
import ButtonForm from './buttonForm'
import { Input } from './inputs/Input'
import { validateEmail } from './validateFunctions/e-mail'
import { validatePassword } from './validateFunctions/password'
import { LoginData } from '../../lib/interfaces'
import { useNavigate } from 'react-router-dom'
import { getToken, login } from '../../services/login.service'

export const LoginForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  function validateAllInputs(): LoginData {
    setIsSubmitted(true)
    const emailValidationResult: string | undefined = validateEmail(email)
    const passwordValidationResult: string | undefined = validatePassword(password)

    if (!emailValidationResult && !passwordValidationResult) {
      const loginData: LoginData = {
        email: email,
        password: password
      }
      return loginData
    }
  }

  const onSubmit = () => {
    if (validateAllInputs()) {
      const { email, password } = validateAllInputs()
      getToken(email, password)
        .then(resp => {
          console.log(resp.data)
          const authData = resp.data
          localStorage.setItem('token', JSON.stringify(authData))
          login(email, password).then(resp => {
            const userData = resp.data
            localStorage.setItem('user', JSON.stringify(userData))
            navigate('/')
          })
        })
        .catch(err => {
          console.error(err)
          if (err.response.data.error == 'invalid_customer_account_credentials') {
            setError(err.response.data.error_description)
          }
        })
    }
  }

  return (
    <form className='bg-secondaryColor dark:bg-grayMColor'>
      <div className='container px-sm py-sm md:px-big md:py-bigY max-w-[1440px] mx-auto lg:px-big'>
        <h3 className={'text-accentColor dark:text-primaryColor text-h3 font-bold pb-bigY'}>Sign In form:</h3>
        {error && (
          <div className='bg-red-500/50 p-4 rounded-md mb-8 flex'>
            <img src='/images/attention-circle-svgrepo-com.svg' alt='' width='24px' className='mr-4' />
            <p>{error}</p>
          </div>
        )}
        <div className={'md:w-form'}>
          <Input
            {...emailValidation}
            isSubmitted={isSubmitted}
            onChange={(newValue: string) => {
              setEmail(newValue)
              setError(null)
            }}
          />
          <Input
            {...passwordValidation}
            isSubmitted={isSubmitted}
            onChange={(newValue: string) => {
              setPassword(newValue)
              setError(null)
            }}
          />
        </div>
        <div className={'my-sm'}>
          <ButtonForm onClick={onSubmit}>SIGN IN</ButtonForm>
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
