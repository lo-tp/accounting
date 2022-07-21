import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Main, SideNavigtion } from '../layout';
import { LoadingIndicator, Toast } from '../components';
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

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const use = async () => {
      (await import('tw-elements')).default;
    };
    use();
  }, []);

  const [loading, setLoading] = useState(false);
  const [toastVisibility, setToastVisibility] = useState(false);
  const [toastText, setToastText] = useState('');

  const showToast = useCallback(({ text }: { text: string }) => {
    setToastVisibility(true);
    setToastText(text);
    setTimeout(setToastVisibility, 2000);
  }, [setToastText, setToastVisibility]);

  const contextValue = useMemo(() => ({
    showToast, setLoading }), [showToast, setLoading]);

  return (
    <QueryClientProvider client={queryClient}>
      <globalContext.Provider value={contextValue}>
        <div className='bg-gray-50 h-full'>
          <LoadingIndicator loading={loading}/>
          <Toast visible={toastVisibility} text={toastText}/>
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
