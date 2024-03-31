import { RegistrationData, ResultProps } from '@interfaces';
import { handleLogin } from './handleLogin';
import { createCustomer } from './registration.service';

export const countryId = {
  Italy: 'IT',
  Spain: 'ES',
  Germany: 'DE'
};

export function dataAdapter(data: RegistrationData): RegistrationData {
  try {
    const billingKey = data.billingAddress.country as keyof typeof countryId;
    const shippingKey = data.shippingAddress.country as keyof typeof countryId;
    data.billingAddress.country = countryId[billingKey];
    data.shippingAddress.country = countryId[shippingKey];
    return data;
  } catch (error) {
    console.log('address lacks data');
  }
}

export async function handleRegistration(data: RegistrationData): Promise<ResultProps> {
  if (data) {
    const dataAdapted = dataAdapter(data);
    const result = await createCustomer(dataAdapted);
    if (result) {
      handleLogin(data.email, data.password);
    }
    return result;
  }
}
