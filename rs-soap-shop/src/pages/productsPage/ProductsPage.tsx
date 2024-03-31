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
  const currentQuery = useRef('');
  const [isEndOfPage, setIsEndOfPage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const page = useRef(1);
  const [element, setElement] = useState(null);
  const currentCategory = useRef(category);
  const currentSubcategory = useRef(subcategory);
  const currentSearchValue = useRef('');
  const isFirstLoading = useRef(true);

  const loadProducts = async () => {
    setIsEndOfPage(false);
    setIsLoading(true);
    const filteredProducts = await getFilteredProducts(currentCategory.current, currentSubcategory.current, currentQuery.current, page.current, currentSearchValue.current);
    if (filteredProducts?.length) {
      setProducts(prevProducts => [...prevProducts, ...filteredProducts]);
      page.current++
    } else setIsEndOfPage(true);
    setIsLoading(false);
    isFirstLoading.current = false;
  }

  useEffect(() => {
    currentCategory.current = category;
    currentSubcategory.current = subcategory;
    currentQuery.current = query;
    page.current = 1;
    isFirstLoading.current = true;

    setProducts([]);
    loadProducts();
  }, [category, subcategory, query]);

  const observer = useRef(new IntersectionObserver((entries) => {
     if (entries[0].isIntersecting && !isFirstLoading.current) {
      loadProducts();
    }
  }, {threshold: 1, rootMargin: '50px'}));

  useEffect(() => {
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
  }, [element]);

  return (
    <>
      <BannerPageName {...{ children: 'OUR PRODUCTS' }} />
      <NavigationView
        nav={{ category, subcategory }}
        changeQuery={setQuery}
      />
      {products.length > 0 && <OurProductsCards {...{ products }} />}
      {products.length === 0 && !isLoading &&
        <div className={'bg-secondaryColor dark:bg-grayMColor flex-1 flex justify-center items-center'}>
          <p className={'text-center'}>Nothing was found</p>
        </div>}
      <div ref={setElement}></div>
      {isLoading && !isEndOfPage && <LoadingSpinner />}
    </>
  );
}

export default ProductsPage;
