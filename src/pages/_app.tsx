import Layout from '../components/layout/layout';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import UserProvider from '@/context/userContext';
import ProvidersWrapper from '@/components/auth/providersWrapper';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
        <ProvidersWrapper>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </ProvidersWrapper>
    </UserProvider>
  );
}
