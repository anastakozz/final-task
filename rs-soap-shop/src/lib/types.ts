export type Category = {
  typeId: string;
  id: string;
};

export type Keyword = {
  text: string;
};

export type ProductImage = {
  url: string;
  label: string;
  dimensions: {
    w: number;
    h: number;
  };
};

export type ProductAttributes = {
  name: string;
  value: string[];
};

export type Price = {
  country: string;
  id: string;
  value: {
    centAmount: number;
    currencyCode: string;
    fractionDigits: number;
    type: string;
  };
  discounted?: {
    value: {
      type: string;
      currencyCode: string;
      centAmount: number;
      fractionDigits: number;
    };
    discount: {
      typeId: string;
      id: string;
    };
  };
};

export type AboutUsType = {
  fullName: string;
  role: string;
  bio: string;
  img: string;
  contributions: string[];
  github: string;
};
export type responseObject = {
  [key: string]: responseObject;
};

export type ProductListItem = {
  [key: string]: string | responseObject;
};

export type CartActionType = {
  action: string;
  lineItemId: string;
  quantity: number;
};

export type ValidFieldNames =
  | 'email'
  | 'password'
  | 'confirmPassword'
