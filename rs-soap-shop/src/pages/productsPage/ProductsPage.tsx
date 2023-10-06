import OurProductsCards from './cardsSection/OurProductsCards';
import { NavigationView } from './navigation/navigationView';
import { useEffect, useState } from 'react';
import BannerPageName from '@components/bannerPageName';
import { useParams } from 'react-router-dom';
import { getCategoryId } from '@services/category.service';
import { getFiltered } from '@services/product.service';
import { Product } from '@interfaces';
import scrollToTop from '@utils/scrollToTop';
import LoadingSpinner from '@components/loading/loading';

function ProductsPage() {
  const [products, setProducts] = useState<Product[]>();
  const { category, subcategory } = useParams();
  const [query, setQuery] = useState(sessionStorage.getItem('query'));
  const [isEndOfPage, setIsEndOfPage] = useState(false);
  const [isUpdatingProducts, setIsUpdatingProducts] = useState(false);
  if (!sessionStorage.getItem('isLoading')) sessionStorage.setItem('isLoading', 'false');
  if (!sessionStorage.getItem('currentPage')) sessionStorage.setItem('currentPage', '1');
  const searchInput: HTMLInputElement = document.querySelector('#searchInput');

  useEffect(() => {
    return () => {
      sessionStorage.setItem('query', '');
      sessionStorage.setItem('currentPage', '');
      sessionStorage.setItem('isLoading', 'false');
    };
  }, []);

  window.addEventListener('beforeunload', () => {
    sessionStorage.setItem('query', '');
    sessionStorage.setItem('currentPage', '');
    sessionStorage.setItem('isLoading', 'false');
  });

  function updateSearchedProducts(products: Product[]) {
    setProducts(products);
    setIsEndOfPage(true);
  }

  function changeQuery(options: string): void {
    setQuery(options);
    sessionStorage.setItem('query', options);
  }

  function updateProductsInCategories() {
    getCategoryId(
      subcategory
        ? subcategory.charAt(0).toUpperCase() + subcategory.slice(1)
        : category.charAt(0).toUpperCase() + category.slice(1)
    ).then(categoryId => {
      getFiltered(`?filter=categories.id:"${categoryId}"&${query}`, 1)
        .then(products => {
        setProducts(products);
      })
        .then(() => {
          setIsUpdatingProducts(false);
          sessionStorage.setItem('isLoading', 'false');
        });
    })
  }

  useEffect(() => {
    scrollToTop();
  }, []);

  useEffect(() => {
    sessionStorage.setItem('isLoading', 'true');
    sessionStorage.setItem('currentPage', '1');
    if (searchInput) searchInput.value = '';
    setIsUpdatingProducts(true);
    setIsEndOfPage(false);
    if (category || subcategory) {
      updateProductsInCategories();
    } else {
      getFiltered(`?${sessionStorage.getItem('query')}`, 1)
        .then(items => {
        setProducts(items);
      })
        .then(() => {
            setIsUpdatingProducts(false);
            sessionStorage.setItem('isLoading', 'false');
        });
    }
  }, [category, subcategory, query]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 300) {
        if (!(category || subcategory)) {
          loadNextPage();
        } else loadNextPageWithCategory();
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [category, subcategory]);

  function loadNextPage() {
    if (sessionStorage.getItem('isLoading') === 'true') return;
    sessionStorage.setItem('isLoading', 'true');
    sessionStorage.setItem('currentPage', String(+sessionStorage.getItem('currentPage') + 1));

    getFiltered(`?${sessionStorage.getItem('query')}`, +sessionStorage.getItem('currentPage'))
      .then(nextPageProducts => {
        if (nextPageProducts.length > 0) {
          setProducts(prevProducts => [...prevProducts, ...nextPageProducts]);
        } else setIsEndOfPage(true);
      })
      .then(() => {
        sessionStorage.setItem('isLoading', 'false');
      })
      .catch(error => {
        console.error(error);
      });
  }

  function loadNextPageWithCategory() {
    if (sessionStorage.getItem('isLoading') === 'true') return;
    sessionStorage.setItem('isLoading', 'true');
    sessionStorage.setItem('currentPage', String(+sessionStorage.getItem('currentPage') + 1));
    getCategoryId(
      subcategory
        ? subcategory.charAt(0).toUpperCase() + subcategory.slice(1)
        : category.charAt(0).toUpperCase() + category.slice(1)
    ).then(categoryId => {
      getFiltered(
        `?filter=categories.id:"${categoryId}"&${sessionStorage.getItem('query')}`,
        +sessionStorage.getItem('currentPage')
      )
        .then(nextPageProducts => {
          if (nextPageProducts.length > 0) {
            setProducts(prevProducts => [...prevProducts, ...nextPageProducts]);
          } else setIsEndOfPage(true);
        })
        .then(() => {
          sessionStorage.setItem('isLoading', 'false');
        })
        .catch(error => {
          console.error(error);
        });
    });
  }

  return (
    <>
      <BannerPageName {...{ children: 'OUR PRODUCTS' }}></BannerPageName>
      <NavigationView
        nav={{ category, subcategory }}
        changeQuery={changeQuery}
        updateSearchedProducts={updateSearchedProducts}
      />
      {isUpdatingProducts ?
        <LoadingSpinner marginTop={'60'} /> :
        <><OurProductsCards {...{ products }} />
          {!isEndOfPage && <LoadingSpinner marginTop={'10'} />}
        </>}
    </>
  );
}

export default ProductsPage;
