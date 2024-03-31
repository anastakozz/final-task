import { NavLink, useNavigate } from 'react-router-dom';
import ProfileIcon from '../../../icons/profileIcon';
import ProfileIconDark from '../../../icons/profileIconDark';
import LogoutIcon from '../../../icons/logoutIcon';
import LogoutIconDark from '../../../icons/logoutIconDark';
import { TokenNames } from '@enums';
import { setAnonymousToken } from '@services/registration.service';
import { getSpecificCart } from '@services/handleCart';
const { userToken, anonymous } = TokenNames;

function LoginArea({ isLoggedIn, onLogout }: { isLoggedIn: boolean; onLogout: () => void }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem(`${userToken}`);
    localStorage.removeItem(`${userToken}Refresh`);
    localStorage.setItem('isUser', 'false');
    localStorage.setItem('isPromoCodeActive', 'false');
    localStorage.setItem('promoCodeActivationMessage', '');
    setAnonymousToken().then(async () => {
      const anonymousToken = JSON.parse(localStorage.getItem(`${anonymous}`)).access_token;
      await getSpecificCart(anonymousToken);
      onLogout();
      navigate('/sign-in');
    });
  };
  return (
    <>
      {isLoggedIn ? (
        <div className='flex'>
          <div className='mr-4'>
            <NavLink to={'/profile'}>
              <ProfileIcon />
              <ProfileIconDark />
            </NavLink>
          </div>

          <div onClick={handleLogout} className='cursor-pointer'>
            <LogoutIcon />
            <LogoutIconDark />
          </div>
        </div>
      ) : (
        <div className='flex flex-col'>
          <NavLink
            className='text-basicColor hover:text-accentColor cursor-pointer dark:text-primaryColor dark:hover:text-accentColor transition'
            to={'/sign-in'}
          >
            Sign in
          </NavLink>
          <NavLink
            className='text-basicColor hover:text-accentColor cursor-pointer dark:text-primaryColor dark:hover:text-accentColor transition'
            to={'/sign-up'}
          >
            Sign up
          </NavLink>
        </div>
      )}
    </>
  );
}

export default LoginArea;
