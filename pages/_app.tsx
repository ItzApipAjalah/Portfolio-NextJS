import { useState } from 'react';
import LoadingScreen from '@/components/animation/LoadingScreen';
import '@/app/globals.css';

function MyApp({ Component, pageProps }: any) {
  const [loading, setLoading] = useState(true);

  const handleAnimationComplete = () => {
    setLoading(false);
  };

  return (
    <>
      {loading && <LoadingScreen onAnimationComplete={handleAnimationComplete} />}
      <div style={{ opacity: loading ? 0 : 1, transition: 'opacity 1s ease-in' }}>
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
