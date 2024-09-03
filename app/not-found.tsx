import { NextPage, NextPageContext } from 'next';
import Link from 'next/link';

interface ErrorProps {
  statusCode: number;
}

const ErrorPage: NextPage<ErrorProps> = ({ statusCode }) => {
  const errorMessage =
    statusCode === 404
      ? "The page you're looking for could not be found."
      : 'An unexpected error has occurred.';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-6xl font-bold mb-4">{statusCode}</h1>
        <p className="text-xl mb-8">{errorMessage}</p>
        <Link href="/" passHref className="text-blue-400 hover:text-blue-600 transition text-lg">
            Go back to Home
        </Link>
      </div>
    </div>
  );
};

// This method gets called on both server-side and client-side
ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res?.statusCode ?? err?.statusCode ?? 404;
  return { statusCode };
};

export default ErrorPage;
