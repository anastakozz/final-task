import { getActiveCart, createCart, updateCart, addLineItem, removeLineItem, deleteCart } from './cart.service';
import { getTokenFromStorage } from '@utils/getLocalStorageToken';
import { ProductListItem } from '@types';

export async function getCart() {
  const token = await getTokenFromStorage();

  try {
    const cart = await getActiveCart(token);
    return cart;
  } catch {
    try {
      const cart = await createCart(token);
      updateCart(token, cart.data.id, cart.data.version);
      return cart;
    } catch (err) {
      console.log(err);
    }
  }
}
export async function clearCart(id: string, version: number) {
  const token = await getTokenFromStorage();

  try {
    await deleteCart(token, id, version);
  } catch (error) {
    console.log(error);
  }

  try {
    const cart = await createCart(token);
    updateCart(token, cart.data.id, cart.data.version);
    return cart;
  } catch (err) {
    console.log(err);
  }
}

export async function getSpecificCart(token: string) {
  try {
    const cart = await getActiveCart(token);
    return cart;
  } catch {
    try {
      const cart = await createCart(token);
      updateCart(token, cart.data.id, cart.data.version);
      return cart;
    } catch (err) {
      console.log(err);
    }
  }
}

export async function getProductsInCart(): Promise<string[]> {
  const cart = await getCart();
  const list = cart.data.lineItems;
  return list.map((a: ProductListItem) => a.productId);
}

export async function sendToCart(id: string) {
  const token = await getTokenFromStorage();
  const cart = await getCart();
  const response = addLineItem(id, token, cart.data.id, cart.data.version);
  return response;
}

export async function removeFromCart(id: string) {
  const token = await getTokenFromStorage();
  const cart = await getCart();
  const list = cart.data.lineItems;
  const lineItem = list.find((item: ProductListItem) => item.productId === id);
  const response = removeLineItem(lineItem.id, token, cart.data.id, cart.data.version);
  return response;
}
