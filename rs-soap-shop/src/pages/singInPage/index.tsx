import React, { useEffect } from 'react';
import { LoginForm } from '@components/forms/LoginForm';
import { useNavigate } from 'react-router-dom';
import scrollToTop from '@utils/scrollToTop';
import { tokenNames } from '@enums';


function SingInPage() {
  const navigate = useNavigate();
  useEffect(() => {
    scrollToTop();
    
    if (localStorage.getItem(`${tokenNames.userToken}`)) {
      navigate('/');
    }
  }, []);
  return <LoginForm />;
}

export default SingInPage;
