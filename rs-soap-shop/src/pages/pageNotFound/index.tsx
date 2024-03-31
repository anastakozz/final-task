import React, { useEffect } from 'react';
import HeavyButton from '@components/buttons/heavyButton';
import { useNavigate } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import NavigationDark from '@components/navigation/navigationDark';
import scrollToTop from '@utils/scrollToTop';

function PageNotFound() {
  useEffect(() => {
    scrollToTop;
  }, []);
  const navigate = useNavigate();
  return (
    <div
      data-testid='page-not-found'
      className='bg-[url("assets/bg-404.jpeg")] bg-no-repeat bg-cover h-screen flex flex-col justify-center items-center p-4'
    >
      <div className='bg-primaryColor opacity-75 p-4 flex flex-col items-center mb-32'>
        <h2 className='text-[100px] text-accentColor font-bold md:text-[200px]'>404</h2>
        <p className='mb-4'>
          <TypeAnimation
            sequence={['Sorry! The page you requested was not found...', 1000]}
            wrapper='span'
            speed={50}
            style={{ fontSize: '16px', display: 'inline-block' }}
            repeat={Infinity}
          />
        </p>
        <HeavyButton onClick={() => navigate('/')}>Go Home</HeavyButton>
      </div>
      <NavigationDark />
    </div>
  );
}

export default PageNotFound;
