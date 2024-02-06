import { apiUrl, projectKey } from '../lib/constants';
import { getBasicToken } from './registration.service';
import axios from 'axios';
import { CardsPerPage } from '../lib/enums';
import { getTokenFromStorage } from '../lib/utils/getLocalStorageToken';
import { Product } from '../lib/interfaces';
import { getCategoryId } from './category.service';

export async function getProductsList(isCatalogCalling?: boolean, page = 1) {
  const accessToken = await getTokenFromStorage(true);
  let queryParms;
  if (isCatalogCalling) {
    queryParms = {
      limit: CardsPerPage.limit,
      offset: (page - 1) * CardsPerPage.limit
    };
  } else {
    queryParms = {};
  }
  try {
    const response = await axios.get(`${apiUrl}/${projectKey}/product-projections/search`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      params: queryParms
    });
    return response.data.results;
  } catch (error) {
    return undefined;
  }
}

export async function getProductByKey(key: string) {
  const accessToken = await getBasicToken();
  try {
    const response = await axios.get(`${apiUrl}/${projectKey}/product-projections/key=${key}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    return response.data;
  } catch (error) {
    return undefined;
  }
}

export async function findProducts(inputProductName: string) {
  if (inputProductName === '') {
    return await getProductsList();
  }
  const accessToken = await getTokenFromStorage(true);
  try {
    const response = await axios.get(
      `${apiUrl}/${projectKey}/product-projections/search?text.en-us="${inputProductName}"`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );
    return response.data.results;
  } catch (error) {
    return undefined;
  }
}

export async function getFiltered(options: string, page = 1) {
  const accessToken = await getTokenFromStorage(true);
  try {
    const response = await axios.get(`${apiUrl}/${projectKey}/product-projections/search${options}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      params: {
        limit: CardsPerPage.limit,
        offset: (page - 1) * CardsPerPage.limit
      }
    });
    return response.data.results;
  } catch (error) {
    return undefined;
  }
}

export function getCategoryName(category: string, subcategory: string) {
  if (subcategory) {
    return subcategory.charAt(0).toUpperCase() + subcategory.slice(1);
  }
  return category.charAt(0).toUpperCase() + category.slice(1);
}

export async function getFilteredProducts(category: string, subcategory: string, query: string, currentPage: number, inputProductName: string) {
  console.log('input', inputProductName);
  let filteredProducts: Product[];
  if (inputProductName) {
    filteredProducts = await getFiltered(`?text.en-us="${inputProductName}"`)
  } else if (category || subcategory) {
    const categoryName = getCategoryName(category, subcategory);
    const categoryId = await getCategoryId(categoryName);
    filteredProducts = await getFiltered(`?filter=categories.id:"${categoryId}"&${query}`, currentPage);
  } else {
    filteredProducts = await getFiltered(`?${query}"`, currentPage);
  }
  return filteredProducts;
}
