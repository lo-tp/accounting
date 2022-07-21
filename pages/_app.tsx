import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect, useMemo, useRef, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Main, SideNavigtion } from '../layout';
import { LoadingIndicator, Toast } from '../components';
import { globalContext } from '../context';
import type { ToastRef } from '../components/Toast';
export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      networkMode: 'always',
    },
    queries: {
      refetchOnWindowFocus: false,
      networkMode: 'always',
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  const toastRef = useRef < ToastRef >(null);
  useEffect(() => {
    const use = async () => {
      (await import('tw-elements')).default;
    };
    use();
  }, []);

  const [loading, setLoading] = useState(false);


  const contextValue = useMemo(() => ({
    // eslint-disable-next-line react-hooks/exhaustive-deps
    showToast: toastRef.current?.showToast!, setLoading }), [setLoading, toastRef.current?.showToast]);

  return (
    <QueryClientProvider client={queryClient}>
      <globalContext.Provider value={contextValue}>
        <div className='bg-gray-50 h-full'>
          <LoadingIndicator loading={loading}/>
          <Toast  ref={toastRef}/>
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
