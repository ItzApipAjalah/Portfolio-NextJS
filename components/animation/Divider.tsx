// components/LottieDivider.tsx
import React from 'react';
import Lottie from 'react-lottie';
import animationData from '@/public/devider.json'; 

const LottieDivider: React.FC = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div className="flex justify-center items-center pointer-events-none">
      <div className="flex w-full overflow-hidden">
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="flex-none">
            <Lottie options={defaultOptions} height={100} width={400} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LottieDivider;
