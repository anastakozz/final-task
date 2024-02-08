import React, { useEffect } from 'react';
import { LoginForm } from '../../components/forms/LoginForm';
import { useNavigate } from 'react-router-dom';
import scrollToTop from '../../lib/utils/scrollToTop';
import { TokenNames } from '../../lib/enums';

function SingInPage() {
  const navigate = useNavigate();
  useEffect(() => {
    scrollToTop();

    if (localStorage.getItem(`${TokenNames.userToken}`)) {
      navigate('/');
    }
  }, []);
  return <LoginForm />;
}

export default SingInPage;
