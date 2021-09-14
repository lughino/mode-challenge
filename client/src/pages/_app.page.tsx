import '../styles/globals.css';
import type { AppProps } from 'next/app';

export function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

// eslint-disable-next-line import/no-default-export
export default MyApp;
