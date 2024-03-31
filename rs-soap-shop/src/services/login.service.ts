import axios from 'axios';
import { apiUrl, authUrl, projectKey, clientId, secret } from '@constants';
import { getSpecificCart } from './handleCart';
import { TokenNames } from '../lib/enums';
const { userToken, anonymous, anonymousRefresh } = TokenNames;

const HEADERS = {
  Authorization: 'Basic ' + btoa(`${clientId}:${secret}`),
  'Content-Type': 'application/x-www-form-urlencoded'
};

export function getToken(username: string, password: string) {
  return axios.post(
    `${authUrl}/oauth/${projectKey}/customers/token?grant_type=password`,
    { username, password },
    { headers: HEADERS }
  );
}

export async function login(email: string, password: string) {
  try {
    const token = JSON.parse(localStorage.getItem(`${userToken}`)).access_token;
    const anonymousToken = JSON.parse(localStorage.getItem(`${anonymous}`)).access_token;

    const cart = await getSpecificCart(anonymousToken);
    const anonymousCart = { id: cart.data.id, typeId: 'cart' };
    localStorage.removeItem(`${anonymous}`);
    localStorage.removeItem(`${anonymousRefresh}`);

    return axios.post(
      `${apiUrl}/${projectKey}/login`,
      { email, password, anonymousCart },
      {
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
}

export async function relogin(email: string, password: string) {
  try {
    const token = JSON.parse(localStorage.getItem(`${userToken}`)).access_token;
    return axios.post(
      `${apiUrl}/${projectKey}/login`,
      { email, password },
      {
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
}
