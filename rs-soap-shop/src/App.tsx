import React, { ReactElement, useEffect, useState, createContext } from 'react';

import './App.css';
import Header from './components/header';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/homePage';
import ProductsPage from './pages/productsPage';
import AboutPage from './pages/aboutPage';
import CartPage from './pages/cartPage';
import SingInPage from './pages/singInPage';
import SignUpPage from './pages/singnUpPage';
import ProfilePage from './pages/profilePage';
import Footer from './components/footer';
import PageNotFound from './pages/pageNotFound';
import DetailedProductPage from './pages/detailedProductPage';
import { setAnonymousToken } from './services/registration.service';
import { tokenNames } from './lib/enums';
const { userToken, anonymous } = tokenNames;

export const CartContext = createContext(null);

const AppLayout = ({ children }: { children: ReactElement }) => {
  const [cart, setCart] = useState(null);
  return (
    <>
      <CartContext.Provider value={[cart, setCart]}>
        <Header />
        {children}
        <Footer />
      </CartContext.Provider>
    </>
  );
};

// const App = () => {
//   const [yourValue, setYourValue] = useState('initialValue');
//
//   // Функция, которая будет вызвана при изменении значения yourValue
//   const yourFunction = () => {
//     console.log('Обновленное значение:', yourValue);
//     // Ваш код, который нужно выполнить при изменении значения
//   };
//
//   // useEffect срабатывает после каждого рендера компонента
//   useEffect(() => {
//     yourFunction();
//   }, [yourValue]); // Указываем зависимость, при изменении которой нужно вызвать useEffect
//
//   // Ваш код компонента...
//
//   return (
//     <div>
//       {/* Ваш код компонента */}
//       <button onClick={() => setYourValue('новое значение')}>
//         Изменить значение
//       </button>
//     </div>
//   );
// };

function App() {
  const [hasToken, setHasToken] = useState<boolean>(false);
  const isLoggedIn = !!localStorage.getItem(`${userToken}`);
  const isSeenBefore = !!localStorage.getItem(`${anonymous}`);

  useEffect(() => {
    async function setToken() {
      if (!isLoggedIn && !isSeenBefore) {
        await setAnonymousToken()
      }
      setHasToken(true);
    }
    setToken();
  }, []);

  return (
    <>
      {hasToken && (
        <Routes>
          <Route
            path='/'
            element={
              <AppLayout>
                <HomePage />
              </AppLayout>
            }
          ></Route>
          <Route
            path='/our-products'
            element={
              <AppLayout>
                <ProductsPage />
              </AppLayout>
            }
          ></Route>
          <Route
            path='/our-products/:category'
            element={
              <AppLayout>
                <ProductsPage />
              </AppLayout>
            }
          ></Route>
          <Route
            path='/our-products/:category/:subcategory'
            element={
              <AppLayout>
                <ProductsPage />
              </AppLayout>
            }
          ></Route>
          <Route
            path='/about-us'
            element={
              <AppLayout>
                <AboutPage />
              </AppLayout>
            }
          ></Route>
          <Route
            path='/cart'
            element={
              <AppLayout>
                <CartPage />
              </AppLayout>
            }
          ></Route>
          <Route
            path='/sign-in'
            element={
              <AppLayout>
                <SingInPage />
              </AppLayout>
            }
          ></Route>
          <Route
            path='/sign-up'
            element={
              <AppLayout>
                <SignUpPage />
              </AppLayout>
            }
          ></Route>
          <Route
            path='/profile'
            element={
              <AppLayout>
                <ProfilePage />
              </AppLayout>
            }
          ></Route>
          <Route
            path='/product/:key'
            element={
              <AppLayout>
                <DetailedProductPage />
              </AppLayout>
            }
          ></Route>
          <Route path='*' element={<PageNotFound />}></Route>
        </Routes>
      )}
    </>
  );
}

export default App;
