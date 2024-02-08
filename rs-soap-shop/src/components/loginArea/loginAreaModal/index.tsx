import { NavLink, useNavigate } from 'react-router-dom';
import { TokenNames } from '../../../lib/enums';
import { setAnonymousToken } from '../../../services/registration.service';
const { userToken, anonymous } = TokenNames;
import { getSpecificCart } from '../../../services/handleCart';

function LoginAreaModal({
  isLoggedIn,
  onClose,
  onLogout
}: {
  isLoggedIn: boolean;
  onClose: () => void;
  onLogout: () => void;
}) {
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
        <>
          <NavLink
            onClick={onClose}
            className='text-primaryColor hover:text-grayLColor cursor-pointer transition w-full'
            to={'/profile'}
          >
            <div className='border-b border-solid border-primaryColor w-full text-2xl py-4 py-4'>My profile</div>
          </NavLink>

          <div
            onClick={() => {
              onClose();
              handleLogout();
            }}
            className='text-primaryColor hover:text-grayLColor cursor-pointer transition border-b border-solid border-primaryColor w-full text-2xl py-4'
          >
            Log Out
          </div>
        </>
      ) : (
        <>
          <NavLink
            onClick={onClose}
            className='text-primaryColor hover:text-grayLColor cursor-pointer transition w-full'
            to={'/sign-in'}
          >
            <div className='border-b border-solid border-primaryColor w-full text-2xl py-4'>Sign in</div>
          </NavLink>
          <NavLink
            onClick={onClose}
            className='text-primaryColor hover:text-grayLColor cursor-pointer transition w-full'
            to={'/sign-up'}
          >
            <div className='border-b border-solid border-primaryColor w-full text-2xl py-4'>Sign up</div>
          </NavLink>
        </>
      )}
    </>
  );
}

export default LoginAreaModal;
