import axios from 'axios';
import { apiUrl, projectKey } from '@constants';
import { IAction } from '@interfaces';

export function getAccountData() {
  try {
    return axios.get(`${apiUrl}/${projectKey}/me`, {
      headers: {
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('userToken')).access_token,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
  } catch (e) {
    console.log(e);
  }
}

export function updateAccountData(id: string, version: string, actions: IAction[]) {
  try {
    return axios.post(
      `${apiUrl}/${projectKey}/customers/${id}`,
      { version, actions },
      {
        headers: {
          Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('userToken')).access_token,
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (e) {
    console.log(e);
  }
}

export function changePassword(id: string, version: string, currentPassword: string, newPassword: string) {
  try {
    return axios.post(
      `${apiUrl}/${projectKey}/customers/password`,
      { id, version, currentPassword, newPassword },
      {
        headers: {
          Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('userToken')).access_token,
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (e) {
    console.log(e);
  }
}
