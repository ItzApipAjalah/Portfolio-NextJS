// components/LottieAnimation.tsx
import React from 'react';
import Lottie from 'react-lottie';
import animationData from '@/public/code.json'; 

const LottieAnimation: React.FC = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden z-0 opacity-50">
      <Lottie options={defaultOptions} />
    </div>
  );
};

export default LottieAnimation;
