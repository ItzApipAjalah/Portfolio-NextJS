import { useEffect, useState } from 'react';
import LoadingScreen from '@/components/animation/LoadingScreen';
import '@/app/globals.css';
import Head from 'next/head';
import { AppProps } from 'next/app';

// Extend the Window interface to include aclib
declare global {
  interface Window {
    aclib?: {
      runPop: (options: { zoneId: string }) => void;
      runAutoTag: (options: { zoneId: string }) => void;
    };
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(true);

  const handleAnimationComplete = () => {
    setLoading(false);
  };

  useEffect(() => {
    // Load AdCash library script asynchronously
    const script = document.createElement('script');
    script.src = '//acscdn.com/script/aclib.js';
    script.async = true;
    script.onload = () => {
      // Run AdCash scripts after the library has loaded
      if (window.aclib) {
        window.aclib.runPop({
          zoneId: '8709442',
        });

        window.aclib.runAutoTag({
          zoneId: 'dtiihq4n4k',
        });
      }
    };
    document.body.appendChild(script);
  }, []);

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <link rel="icon" href="https://anime.amwp.website/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="my new portfolio using Next.js." />
        <meta name="keywords" content="portfolio, AMWP, afifmedya, ItzApipAjalah" />
        <meta name="author" content="AMWP" />
        <meta property="og:title" content="Portfolio Afif Medya" />
        <meta property="og:description" content="my new portfolio using Next.js." />
        <meta property="og:image" content="/image/logo.png" />
        <meta property="og:url" content="https://amwp.website" />
        <meta property="og:type" content="website" />
        <title>Portfolio</title>
      </Head>
      {loading && <LoadingScreen onAnimationComplete={handleAnimationComplete} />}
      <div style={{ opacity: loading ? 0 : 1, transition: 'opacity 1s ease-in' }}>
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
