import { date, object, string } from 'yup';
import * as yup from 'yup';

export const loginSchema = object({
  email: string()
    .required()
    .email('email is not valid')
    .matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      'email is not valid'
    ),
  password: string()
    .required()
    .matches(
      /^(?=.*[а-яa-z])/,
      'password must contains at least one lowercase letter'
    )
    .matches(
      /(?=.*[А-ЯA-Z])/,
      'password must contains at least one uppercase letter'
    )
    .matches(/(?=.*\d)/, 'password must contains at least one number')
    .matches(
      /(?=.*[@$!();-=№#"%*?&])/,
      'password must contains at least one special character'
    )
    .matches(/(.{8,})/, 'the password must contain at least 8 characters.'),
})

export const registrationSchema = object({
  email: string()
    .required()
    .email('email is not valid')
    .matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      'email is not valid'
    ),
  password: string()
    .required()
    .matches(
      /^(?=.*[а-яa-z])/,
      'password must contains at least one lowercase letter'
    )
    .matches(
      /(?=.*[А-ЯA-Z])/,
      'password must contains at least one uppercase letter'
    )
    .matches(/(?=.*\d)/, 'password must contains at least one number')
    .matches(
      /(?=.*[@$!();-=№#"%*?&])/,
      'password must contains at least one special character'
    )
    .matches(/(.{8,})/, 'the password must contain at least 8 characters.'),
  confirmPassword: string()
    .oneOf([yup.ref('password'), undefined], 'passwords must match')
    .required('confirm password is required'),
  firstName: string()
    .required('must contain at least one character')
    .matches(/^[А-ЯA-Z]/, 'first letter must be capitalize')
    .matches(/[a-zA-Z]*$/, 'The name must not contain numbers'),
  secondName: string()
    .required('must contain at least one character')
    .matches(/^[А-ЯA-Z]/, 'first letter must be capitalize')
    .matches(/[a-zA-Z]*$/, 'the name must not contain numbers'),
  date: date().required().typeError('type error'),
  country: string().required(),
  country2: string().required('country is required field'),
  city: string().required().matches( /^[a-zA-Z]+$/, 'The field must not contain special characters or numbers.'),
  city2: string().required('city is a required field').matches( /^[a-zA-Z]+$/, 'The field must not contain special characters or numbers.'),
  street: string().required(),
  street2: string().required('street is a required field'),
  house: string().required(),
  house2: string().required('house is a required field'),
  postalCode: string().required('postal code is required field').matches(/^[0-9]+$/, 'The postal code must contain only numbers').matches(/^.{5}$/, 'The length of the zip code must be equal to 5'),
  postalCode2: string().required('postal code is required field').matches(/^[0-9]+$/, 'The postal code must contain only numbers').matches(/^.{5}$/, 'The length of the zip code must be equal to 5'),
});

export const withoutShippingSchema = object({
  email: string()
    .required()
    .email('email is not valid')
    .matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      'email is not valid'
    ),
  password: string()
    .required()
    .matches(
      /^(?=.*[а-яa-z])/,
      'password must contains at least one lowercase letter'
    )
    .matches(
      /(?=.*[А-ЯA-Z])/,
      'password must contains at least one uppercase letter'
    )
    .matches(/(?=.*\d)/, 'password must contains at least one number')
    .matches(
      /(?=.*[@$!();-=№#"%*?&])/,
      'password must contains at least one special character'
    )
    .matches(/(.{8,})/, 'the password must contain at least 8 characters.'),
  confirmPassword: string()
    .oneOf([yup.ref('password'), undefined], 'passwords must match')
    .required('confirm password is required'),
  firstName: string()
    .required('must contain at least one character')
    .matches(/^[А-ЯA-Z]/, 'first letter must be capitalize')
    .matches(/[a-zA-Z]*$/, 'The name must not contain numbers'),
  secondName: string()
    .required('must contain at least one character')
    .matches(/^[А-ЯA-Z]/, 'first letter must be capitalize')
    .matches(/[a-zA-Z]*$/, 'the name must not contain numbers'),
  date: date().required().typeError('type error'),
  country: string().required(),
  city: string().required().matches( /^[a-zA-Z]+$/, 'The field must not contain special characters or numbers.'),
  street: string().required(),
  house: string().required(),
  postalCode: string().required('postal code is required field').matches(/^[0-9]+$/, 'The postal code must contain only numbers').matches(/^.{5}$/, 'The length of the zip code must be equal to 5'),
});

