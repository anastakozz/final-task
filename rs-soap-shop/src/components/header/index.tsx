import { useEffect, useState, useContext } from 'react';

import { NavLink } from 'react-router-dom';
import { DarkModeButton } from '../darkModeButton';
import LoginArea from '../loginArea/loginAreaDesctop';
import Navigation from '../navigation/navigationLight';
import CartIconDark from '../../icons/cartIconDark';
import CartIcon from '../../icons/cartIcon';
import BurgerMenuButton from '../burgerMenuButton';
import NavigationModal from '../navigation/navigationModal';
import { TokenNames } from '../../lib/enums';
const { userToken } = TokenNames;

import { CartContext } from '../../App';
import ShopLogo from '../../icons/shopLogo';
import { getCart } from '../../services/handleCart';

function Header() {
  const [cart, setCart] = useContext(CartContext);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const amount = cart ? cart?.lineItems.length : 0;

  useEffect(() => {
    getCart()
      .then(res => setCart(res.data))
      .catch(e => console.log(e));
  }, []);

  useEffect(() => {
    const changeWidth = () => {
      if (window.innerWidth > 768) {
        handleCloseMenu();
      }
    };

    window.addEventListener('resize', changeWidth);
  }, []);

  useEffect(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const handleChangeMode = () => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    }
  };

  const isLoggedIn = !!localStorage.getItem(`${userToken}`);

  const handleOpenMenu = () => {
    document.body.classList.add('overflow-hidden');
    setIsMenuOpen(true);
  };
  const handleCloseMenu = () => {
    document.body.classList.remove('overflow-hidden');
    setIsMenuOpen(false);
  };

  const onLogout = () => {
    setCart({ ...cart, lineItems: [] });
  };

  return (
    <header data-tested='header' className='bg-primaryColor dark:bg-grayLColor transition relative'>
      <div className='max-w-[1440px] mx-auto px-4 flex justify-between items-center h-24 lg:px-big'>
        <NavLink
          to={'/'}
          className='text-basicColor dark:text-primaryColor drop-shadow-sm hover:text-accentColor dark:hover:text-accentColor active:scale-95 transition'
        >
          <ShopLogo></ShopLogo>
        </NavLink>
        <Navigation />
        {isMenuOpen && (
          <NavigationModal onLogout={onLogout} isOpen={isMenuOpen} onClose={handleCloseMenu} isLoggedIn={isLoggedIn} />
        )}
        <div className='flex items-center'>
          <DarkModeButton onChange={handleChangeMode} />
          <NavLink
            className='text-basicColor mr-8 hover:scale-110 transition dark:text-primaryColor transition'
            to={'/cart'}
          >
            <div className='relative'>
              <CartIconDark />
              <CartIcon />
              <div className='opacity-75 rounded-full w-[20px] h-[20px] flex items-center justify-center bg-accentColor border-2 border-primaryColor text-primaryColor text-[10px] absolute z-10 top-[-15px] right-[-15px]'>
                {amount}
              </div>
            </div>
          </NavLink>
          <div className='flex items-center hidden md:flex'>
            <LoginArea onLogout={onLogout} isLoggedIn={isLoggedIn} />
          </div>
          <BurgerMenuButton onCloseMenu={handleCloseMenu} onClick={handleOpenMenu} isMenuOpen={isMenuOpen} />
        </div>
      </div>
    </header>
  );
}

export default Header;
