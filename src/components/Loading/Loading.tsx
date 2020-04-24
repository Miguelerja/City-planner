import React, { useState, useEffect } from 'react';
import './loading.scss';

export const Loading = () => {
  const [loadingText, setLoadingText] = useState<string>('Loading');

  useEffect(() => {
    const interval = window.setInterval(() => {
      const stopper = 'Loading...';
      (loadingText === stopper)
        ? setLoadingText('Loading')
        : setLoadingText(prevState => (prevState + '.'));
    }, 500);

    return () => window.clearInterval(interval);
  }, [loadingText]);

    return (
      <p className='loading'>{loadingText}</p>
    );
};
