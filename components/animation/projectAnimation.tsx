// components/projectAnimation.tsx
import React from 'react';
import Lottie from 'react-lottie';
import animationData from '@/public/zignHPeJ5U.json';

const projectAnimation: React.FC = React.memo(() => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden z-0 opacity-30 pointer-events-none">
      <Lottie options={defaultOptions} />
    </div>
  );
});

export default projectAnimation;
