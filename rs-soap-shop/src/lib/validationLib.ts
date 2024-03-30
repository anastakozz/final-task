import { IValidationNames } from './interfaces';

export const defaultInputsValues = {
  email: '',
  password: '',
  firstName: '',
  secondName: ''
};

export const validationNames: IValidationNames = {
  Email: 'email',
  Password: 'password',
  ['First name']: 'firstName',
  ['Second name']: 'secondName',
  confirmPassword: 'confirmPassword',
  ['Date of birth']: 'date',
  Country: 'country',
  City: 'city',
  City2: 'city2',
  House: 'house',
  House2: 'house2',
  Street: 'street',
  Street2: 'street2',
  ['Postal code']: 'postalCode',
  ['Postal code2']: 'postalCode2',
  isDefaultBillingAddress: 'isDefaultBillingAddress',
  isDefaultShippingAddress: 'isDefaultShippingAddress',
  Country2: 'country2',
}
