import { Product, ProductCardProps } from '@interfaces';

export default function toCardAdapter(data: Product, isInCart?: boolean): ProductCardProps {
  const variant = data.masterVariant;
  const dataForCard: ProductCardProps = {
    isInCart,
    productId: data.id,
    label: data.name['en'],
    description: `Natural ${data.searchKeywords['en'][0].text}`,
    imgSrc: variant.images[0].url,
    link: `/product/${data.key}`,
    price: `${(variant.prices[0].value.centAmount / 100).toLocaleString('en-US', {
      style: 'currency',
      currency: `${variant.prices[0].value.currencyCode}`
    })}`,
    isOnSale: false,
    newPrice: null
  };
  const sale = variant.prices[0].discounted;
  if (sale) {
    dataForCard.isOnSale = true;
    dataForCard.newPrice = `${(sale.value.centAmount / 100).toLocaleString('en-US', {
      style: 'currency',
      currency: `${sale.value.currencyCode}`
    })}`;
  }
  return dataForCard;
}
