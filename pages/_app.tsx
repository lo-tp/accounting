import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Main, SideNavigtion } from '../layout';
import { LoadingIndicator } from '../components';
export const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const use = async () => {
      (await import('tw-elements')).default;
    };
    use();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className='bg-gray-50 h-full'>
        <LoadingIndicator/>
        <Main>
          <SideNavigtion/>
          <div className='grow px-8 pt-8'>
            <Component {...pageProps} />
          </div>
        </Main>
      </div>
    </QueryClientProvider >
  );
}

export default MyApp;
