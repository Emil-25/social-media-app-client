import Layout from '../components/layout/layout';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { setAuthToken } from '@/utils/setAuthToken';

export default function App({ Component, pageProps }: AppProps) {
    const token = localStorage.getItem("token");
    if (token) {
        setAuthToken(token);
    }
  return (
    <Layout>
        <Component {...pageProps} />
    </Layout>
  );
}
