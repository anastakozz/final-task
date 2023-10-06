import { getBasicToken } from './registration.service';
import axios from 'axios';
import { apiUrl, projectKey } from '@constants';
import { CategoryData } from '@interfaces';

export async function getCategoryId(key: string) {
  const accessToken = await getBasicToken();
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
  const accessToken = await getBasicToken();
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

export async function getCategoriesNames() {
  const categoriesData = await getCategories();
  try {
    return categoriesData.map((categoryData: CategoryData) => {
      const categoryName: string = categoryData.name.en;
      return categoryName[0].toUpperCase() + categoryName.slice(1);
    });
  } catch {
    return undefined;
  }
}
