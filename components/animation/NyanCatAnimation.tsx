import React, { useEffect, useState } from 'react';
import Lottie from 'react-lottie';
import animationData from '@/public/pembatas.json';

const LottieScrollAnimation: React.FC = () => {
  const [animations, setAnimations] = useState<number[]>([]);
  const [intervalDuration, setIntervalDuration] = useState<number>(4000);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIntervalDuration(window.innerWidth <= 768 ? 10000 : 4000);
    };

    handleResize();

    const addAnimation = () => {
      setAnimations(prevAnimations => [...prevAnimations, Date.now()]);
    };

    addAnimation();

    const intervalId = setInterval(addAnimation, intervalDuration);

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('resize', handleResize);
    };
  }, [intervalDuration]);

  return (
    <div className="relative w-full h-32 ">
      {animations.map(id => (
        <div
          key={id}
          className="absolute inset-0 w-full h-32"
        >
          <div className="absolute inset-0 animate-lottieMove">
            <Lottie options={defaultOptions} height={320} width={320} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LottieScrollAnimation;
