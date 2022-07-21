import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect, useMemo, useRef } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Main, SideNavigtion } from '../layout';
import { LoadingIndicator, Toast } from '../components';
import type { LoadingIndicatorRef, ToastRef } from '../components';
import { globalContext } from '../context';
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

const pages = [{
  title: 'Transaction',
  url: '/transaction',
}, {
  title: 'Accounting',
  url: '/account',
}];

function MyApp({ Component, pageProps }: AppProps) {
  const toastRef = useRef < ToastRef >(null);
  const loadingIndicatorRef = useRef <LoadingIndicatorRef>(null);
  useEffect(() => {
    const use = async () => {
      (await import('tw-elements')).default;
    };
    use();
  }, []);



  const contextValue = useMemo(()=>( {
    toastRef,
    loadingIndicatorRef,
  }), [toastRef, loadingIndicatorRef]);

  return (
    <QueryClientProvider client={queryClient}>
      <globalContext.Provider value={contextValue}>
        <div className='bg-gray-50 h-full'>
          <LoadingIndicator ref={loadingIndicatorRef}/>
          <Toast  ref={toastRef}/>
          <Main>
            <SideNavigtion pages={pages}/>
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
