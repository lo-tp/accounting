import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Main, SideNavigtion } from '../layout';
import { LoadingIndicator } from '../components';
import { globalContext } from '../context';
export const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const use = async () => {
      (await import('tw-elements')).default;
    };
    use();
  }, []);

  const [loading, setLoading] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <globalContext.Provider value={{ setLoading }}>
        <div className='bg-gray-50 h-full'>
          <LoadingIndicator loading={loading}/>
          <Main>
            <SideNavigtion/>
            <div className='grow px-8 pt-8'>
              <Component {...pageProps} />
            </div>
          </Main>
        </div>
      </globalContext.Provider >
    </QueryClientProvider >
  );
}

export default MyApp;
