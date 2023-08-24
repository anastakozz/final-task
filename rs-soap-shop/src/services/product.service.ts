import { apiUrl, projectKey } from '../lib/constants'
import { getBasicToken } from './registration.service'
import axios from 'axios'

export async function getProductsList() {
  const accessToken = await getBasicToken()
  try {
    const response = await axios.get(`${apiUrl}/${projectKey}/product-projections/search`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    return response.data.results
  } catch (error) {
    return undefined
  }
}