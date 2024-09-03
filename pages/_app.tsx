import { useState } from 'react';
import LoadingScreen from '@/components/animation/LoadingScreen';
import '@/app/globals.css';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { AppProps } from 'next/app';
function MyApp({ Component, pageProps }: AppProps) {
  
  const [loading, setLoading] = useState(true);

  const handleAnimationComplete = () => {
    setLoading(false);
  };

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <link rel="icon" href="https://anime.amwp.website/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="my new portoflio using nextjs."
        />
        <meta
          name="keywords"
          content="portfolio, AMWP, afifmedya, ItzApipAjalah"
        />
        <meta name="author" content="AMWP" />
        <meta property="og:title" content="Portfolio Afif Medya" />
        <meta
          property="og:description"
          content="my new portoflio using nextjs."
        />
        <meta property="og:image" content="/image/logo.png" />
        <meta property="og:url" content="https://amwp.website" />
        <meta property="og:type" content="website" />
        <title>Portofolio</title>
      </Head>
      {loading && <LoadingScreen onAnimationComplete={handleAnimationComplete} />}
      <div style={{ opacity: loading ? 0 : 1, transition: 'opacity 1s ease-in' }}>
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
