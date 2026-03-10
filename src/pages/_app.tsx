import '@/styles/globals.css';

import Navbar from '@/components/Navbar';
import { ChakraProvider, DarkMode } from '@chakra-ui/react';

import type { AppProps } from 'next/app'
import theme from '@/styles/theme';
import { GlobalContextProvider } from '@/components/contexts/globalContexts';
import Layout from '@/components/Layout';
import { Analytics } from '@vercel/analytics/react';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ChakraProvider>
        <GlobalContextProvider>
          <DarkMode>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </DarkMode>
        </GlobalContextProvider>
      </ChakraProvider>
      <Analytics />
    </>
  )

}
