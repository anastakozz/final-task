import OurProductsCards from './cardsSection/OurProductsCards';
import { NavigationView } from './navigation/navigationView';
import { useEffect, useRef, useState } from 'react';
import BannerPageName from '../../components/bannerPageName';
import { useParams } from 'react-router-dom';
import { getFilteredProducts } from '../../services/product.service';
import { Product } from '../../lib/interfaces';
import LoadingSpinner from '../../components/loading/loading';

function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const { category, subcategory } = useParams();
  const [query, setQuery] = useState('');
  const [isEndOfPage, setIsEndOfPage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const page = useRef(1);
  const [element, setElement] = useState(null);
  const currentCategory = useRef(category);
  const currentSubcategory = useRef(subcategory);
  const [searchValue, setSearchValue] = useState('');
  const currentSearchValue = useRef('');

  const loadProducts = async () => {
    setIsLoading(true);
    const filteredProducts = await getFilteredProducts(currentCategory.current, currentSubcategory.current, query, page.current, currentSearchValue.current);
    if (filteredProducts?.length) {
      setProducts(prevProducts => [...prevProducts, ...filteredProducts]);
      page.current++
    } else setIsEndOfPage(true);
    setIsLoading(false);
  }

  useEffect(() => {
    page.current = 1;
    setProducts([]);
  }, [category, subcategory, query, searchValue]);

  const observer = useRef(new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      loadProducts();
    }
  }, {threshold: 1, rootMargin: '50px'}));

  useEffect(() => {
    currentCategory.current = category;
    currentSubcategory.current = subcategory;
    currentSearchValue.current = searchValue;

    const currentElement = element;
    const currentObserver = observer.current;
    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    }
  }, [element, category, subcategory, query, searchValue]);

  return (
    <>
      <BannerPageName {...{ children: 'OUR PRODUCTS' }} />
      <NavigationView
        nav={{ category, subcategory }}
        changeQuery={setQuery}
        setSearchValue={setSearchValue}
      />
      {products.length ?
        <OurProductsCards {...{ products }} /> :
        <div className={'h-100'}></div>}
      <div ref={setElement}></div>
      {isLoading && !isEndOfPage && <LoadingSpinner />}
    </>
  );
}

export default ProductsPage;
