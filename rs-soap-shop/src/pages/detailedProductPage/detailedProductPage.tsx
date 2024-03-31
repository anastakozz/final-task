import { useParams } from 'react-router-dom';
import { getProductByKey } from '@services/product.service';
import React, { useContext, useEffect, useState } from 'react';
import { DetailsProps, ResultProps } from '@interfaces';
import CarouselDefault from '@components/carousel';
import toDetailsAdapter from '@utils/productDataAdapters.ts/toDetailsAdapter';
import SliderModal from '@components/SliderModal';
import scrollToTop from '@utils/scrollToTop';
import AddButton from './addButton';
import RemoveButton from './removeButton';
import { sendToCart, getProductsInCart, removeFromCart } from '@services/handleCart';
import ResultMessage from '@components/ResultMessage';
import { CartContext } from '@App';

function DetailedProductPage() {
  const [submitResult, setSubmitResult] = useState<ResultProps>({
    isSuccess: false,
    message: '',
    isVisible: false
  });
  const [isInCart, setIsInCart] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [cart, setCart] = useContext(CartContext);
  const [isModalVisible, setModalVisibility] = useState(false);
  const [data, initProductData] = useState<DetailsProps | null>(null);
  const { key } = useParams();

  useEffect(() => {
    scrollToTop();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const cartProducts = getProductsInCart(cart);
      const product = await getProductByKey(key);
      if (cartProducts.includes(product.id)) {
        setIsInCart(true);
      }
      const adaptedProduct = toDetailsAdapter(product);
      initProductData(adaptedProduct);
    };
    fetchData().catch(e => {
      console.log(e);
    });
  }, []);

  function toggleModal(event: React.MouseEvent) {
    const target = event.target as HTMLElement;
    const list = target.classList;
    if (!isModalVisible && target.tagName === 'IMG') {
      setModalVisibility(!isModalVisible);
    } else if (isModalVisible && (list.contains('closing-icon') || list.contains('back'))) {
      setModalVisibility(!isModalVisible);
    }
  }

  async function handleAddClick() {
    try {
      setIsSending(true);
      const res = await sendToCart(data.productId);
      try {
        setCart({ ...cart, ...res.data });
      } catch (error) {
        console.log(error);
      }
      setIsInCart(true);
    } catch (err) {
      console.log(err);
    } finally {
      setIsSending(false);
    }
  }

  async function handleRemoveClick() {
    try {
      setIsSending(true);
      const res = await removeFromCart(data.productId);

      try {
        setCart({ ...cart, ...res.data });
      } catch (err) {
        console.log(err);
      }

      setSubmitResult({
        isSuccess: true,
        message: 'Product has been removed from cart',
        isVisible: true
      });
      setIsInCart(false);
    } catch (err) {
      setSubmitResult({
        isSuccess: false,
        message: 'Ooops. Something went wrong.',
        isVisible: true
      });
      console.log(err);
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className='bg-primaryColor dark:bg-grayMColor flex-1'>
      {data ? (
        <div className='max-w-[1440px] mx-auto px-8 lg:px-big py-4'>
          <h1 className='text-h2 py-4 text-center md:text-left text-accentColor dark:text-primaryColor'>{data.name}</h1>
          <div className='flex items-center flex-col md:flex-row md:justify-between md:items-start'>
            <div onClick={toggleModal} className='max-w-[400px] mx-auto h-[400px] md:mx-0 md:ml-10 mb-10'>
              {data.imgSources.length === 1 ? (
                <img className='rounded-xl object-cover h-full w-full' src={data.imgSources[0]}></img>
              ) : (
                <CarouselDefault
                  {...{ paths: data.imgSources, classes: 'h-full w-full object-cover' }}
                ></CarouselDefault>
              )}
            </div>
            <div className='max-w-[400px] md:max-w-[60%] md:order-first'>
              <p className='text-h5 dark:text-primaryColor mb-sm'>{data.description}</p>
              <div className='flex items-center w-full justify-between mb-sm '>
                {data.isOnSale ? (
                  <>
                    <div className='text-h3 md:text-h2 whitespace-nowrap'>{data.newPrice}</div>
                    <div className='flex items-center'>
                      <div className='text-h5 md:text-h2 line-through text-graySColor dark:text-graySColor ml-8 whitespace-nowrap'>
                        {data.price}
                      </div>
                      <div className='h-min bg-red-500/90 text-primaryColor font-bold px-4 ml-8'>SALE</div>
                    </div>
                  </>
                ) : (
                  <div className='text-h2 whitespace-nowrap'>{data.price}</div>
                )}
              </div>
              <div className='flex gap-[15px] flex-wrap'>
                <AddButton isInCart={isInCart} isSending={isSending} onClick={handleAddClick}></AddButton>
                <RemoveButton isInCart={isInCart} isSending={isSending} onClick={handleRemoveClick}></RemoveButton>
                <div
                  onClick={() => {
                    setSubmitResult({
                      isSuccess: false,
                      message: '',
                      isVisible: false
                    });
                  }}
                >
                  <ResultMessage {...submitResult}></ResultMessage>
                </div>
              </div>

              <div className='flex my-sm'>
                <div className='mr-sm'>Tags:</div>
                <div>
                  {data.keyWords.map((item, index) => {
                    return (
                      <span className='ml-4' key={`key-${index}`}>
                        {item}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div onClick={toggleModal}>
            {isModalVisible ? <SliderModal {...{ paths: data.imgSources }}></SliderModal> : <></>}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default DetailedProductPage;
