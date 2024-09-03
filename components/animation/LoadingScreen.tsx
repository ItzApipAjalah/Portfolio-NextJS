import React, { useEffect, useState } from 'react';
import Lottie from 'react-lottie';
import animationData from '@/public/loading.json';
import styles from '../modules/LoadingScreen.module.css';

const LoadingScreen: React.FC<{ onAnimationComplete: () => void }> = ({ onAnimationComplete }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(onAnimationComplete, 1000); 
    }, 3000);

    return () => clearTimeout(timer);
  }, [onAnimationComplete]);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div className={`pointer-events-none ${styles.loadingScreen} ${fadeOut ? styles.fadeOut : ''}`}>
      <Lottie options={defaultOptions} height={400} width={400} />
    </div>
  );
};

export default LoadingScreen;
