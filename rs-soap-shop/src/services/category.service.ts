import axios from 'axios';
import { apiUrl, projectKey } from '@constants';
import { getTokenFromStorage } from '@utils/getLocalStorageToken';

export async function getCategoryId(key: string) {
  const accessToken = await getTokenFromStorage(true);
  try {
    const response = await axios.get(`${apiUrl}/${projectKey}/categories/key=${key}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    return response.data.id;
  } catch (error) {
    return undefined;
  }
}

export async function getCategories() {
  const accessToken = await getTokenFromStorage(true);
  try {
    const response = await axios.get(`${apiUrl}/${projectKey}/categories/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    return response.data.results;
  } catch (error) {
    return undefined;
  }
}
