import { Category, Keyword, Price, ProductAttributes, ProductImage, ProductListItem } from './types';
import React from 'react';

export interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  children: string;
  onClick?: VoidFunction;
  to?: string;
  role?: string;
  notFixedWidth?: boolean;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface InputProps {
  name?: string;
  label: string;
  type: string;
  val?: string;
  isColumn?: boolean;
  placeholder?: string;
  isSubmitted?: boolean;
  onChange?: (value: string) => void;
  disabled?: boolean;
  autoComplete?: string;
}

export interface OurProductsCardsProps {
  products?: Product[];
  changeQuery?: (options: string) => void;
}

export interface RegistrationData {
  firstName: string;
  secondName: string;
  email: string;
  password: string;
  date: string;
  billingAddress: Address;
  shippingAddress: Address;
}

export interface Address {
  id?: string;
  country: string;
  city: string;
  street: string;
  house: string;
  postalCode: string;
  isDefault: boolean;
}

export interface CategoryCardProps {
  name: string;
  path: string;
  link: string;
}

export interface ProductCardProps {
  label: string;
  description: string;
  imgSrc: string;
  link?: string;
  price: string;
  isOnSale: boolean;
  newPrice?: string;
  productId: string;
  isInCart?: boolean;
}

export interface RegistrationData {
  firstName: string;
  secondName: string;
  email: string;
  password: string;
  date: string;
  billingAddress: Address;
  shippingAddress: Address;
}

export interface Address {
  country: string;
  city: string;
  street: string;
  house: string;
  postalCode: string;
  isDefault: boolean;
}

export interface ResultProps {
  isSuccess?: boolean | null;
  message: string;
  isVisible?: boolean;
  data?: string;
  disableRedirect?: boolean;
}

export interface BannerProps {
  label: string;
  title: string;
  description: string;
  buttonText: string;
  linkAdress: string;
}

export interface Product {
  discountedPrice: {
    value: {
      type: string;
      currencyCode: string;
      centAmount: number;
      fractionDigits: number;
    };
  };
  id: string;
  productKey?: string;
  version: string;
  productType: {
    typeId: string;
    id: string;
  };
  name: {
    en: string;
  };
  description: {
    en: string;
  };
  categories: Category[];
  slug: {
    en: string;
  };
  masterVariant: {
    attributes: ProductAttributes[];
    images: ProductImage[];
    prices: Price[];
    id: number;
  };
  variant?: {
    attributes: ProductAttributes[];
    images: ProductImage[];
    prices: Price[];
    id: number;
  };
  price?: Price;
  totalPrice?: {
    centAmount: number;
    currencyCode: string;
    fractionDigits: number;
    type: string;
  };
  metaTitle: {
    en: string;
  };
  quantity?: number;
  metaDescription: {
    en: string;
  };
  searchKeywords: {
    en: Keyword[];
  };
  hasStagedChanges: boolean;
  published: boolean;
  key: string;
  taxCategory: {
    typeId: string;
    id: string;
  };
  priceMode: string;
  createdAt: string;
  lastModifiedAt: string;
}

export interface CategoryData {
  name: {
    en: string;
  };
}

export interface parentCategoryProps {
  onSelectCategory: (category: string) => void;
  category: string;
  option: string;
  handleCategoryClick: () => void;
  setOpenedCategory: React.Dispatch<React.SetStateAction<string>>;
  openedCategory: string;
}

export interface CategoryDropdownArrowProps {
  option: string;
  openedCategory: string;
  setOpenedCategory: React.Dispatch<React.SetStateAction<string>>;
}

export interface SubCategoryProps {
  onSelectCategory: (category: string) => void;
  isDropdownOpened: boolean;
  openedCategory: string;
}

export interface DetailsProps {
  productId: string;
  name: string;
  description: string;
  imgSources: string[];
  link: string;
  price: string;
  isOnSale: boolean;
  newPrice: string | null;
  keyWords: string[];
}

export interface AddressCardI {
  id: string;
  country: string;
  city: string;
  streetName: string;
  building: string;
  postalCode: string;
  billingAddressIds: string[];
  shippingAddressIds: string[];
}
export interface PageNameProp {
  children: string | JSX.Element | JSX.Element[];
}

export interface IAction {
  action: string;
  addressId?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  email?: string;
}

export interface NavigationViewProps {
  nav?: {
    category?: string;
    subcategory?: string;
  };
  changeQuery?: (options: string) => void;
  updateSearchedProducts?: (products: Product[]) => void;
}

export interface ICart {
  lineItems: ProductListItem[];
}
