import React from 'react';
import loadingGif from '../../assets/loading.gif';
import PropTypes from 'prop-types';

function LoadingSpinner({ marginTop = '50' }) {
  return (
    <div className={'flex-1 dark:bg-grayMColor'}>
      <div className={`loading-spinner w-big mx-auto mt-${marginTop} mb-big`}>
        <img src={loadingGif} alt='loading' />
      </div>
    </div>
  );
}

LoadingSpinner.propTypes = {
  marginTop: PropTypes.string
};

export default LoadingSpinner;
