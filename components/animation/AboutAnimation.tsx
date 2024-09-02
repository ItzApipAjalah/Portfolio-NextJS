// components/AboutAnimation.tsx
import React from 'react';
import Lottie from 'react-lottie';
import animationData from '@/public/orang.json'; 

const AboutAnimation: React.FC = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div className="absolute bottom-0 right-0 m-4 flex items-end justify-end z-0 opacity-50">
      <Lottie options={defaultOptions} width={500} height={500} />
    </div>
  );
};

export default AboutAnimation;
