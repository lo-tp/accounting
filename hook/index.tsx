import { useCallback, useContext, useMemo } from 'react';
import { globalContext } from '../context';
import type { GlobalContext  } from '../context';
import { createAccount, getAccount } from '../apis/account';

export const useGlobalContext = (): GlobalContext => useContext(globalContext);
type Arg = Pick<GlobalContext,  'toastRef' | 'loadingIndicatorRef'>;
type UseGetGlobalContextValue = (arg: Arg)=> GlobalContext;

interface UseWrapApiProp extends Arg {
  func: Function
  errorMessage?: string
}


function useWrapApi({
  func,
  errorMessage = 'Something Went Wrong, Please Try Again Later',
  loadingIndicatorRef,
  toastRef,
}: UseWrapApiProp): any {
  //@ts-ignore
  return useCallback(async (...arg) => {
    loadingIndicatorRef.current?.setLoading(true);
    try {
      const res = await func(...arg);
      return res;
    } catch {
      toastRef.current?.showToast({ text:errorMessage });
    } finally {
      loadingIndicatorRef.current?.setLoading(false);
    }

  }, [loadingIndicatorRef, toastRef, func, errorMessage]);
}

export const useGetGlobalContextValue: UseGetGlobalContextValue = (arg) => {
  const { loadingIndicatorRef, toastRef } = arg;
  const wrappedCreateAccount = useWrapApi({
    func: createAccount,
    loadingIndicatorRef,
    errorMessage:'Something Went Wrong When Creating the New Account Please Try Again Later',
    toastRef,
  });
  const wrappedGetAccount = useWrapApi({
    func: getAccount,
    loadingIndicatorRef,
    errorMessage:'Something Went Wrong When Fetching Accounts Please Try Again Later',
    toastRef,
  });

  const res = useMemo(() => ({ 
    ...arg,
    createAccount: wrappedCreateAccount,
    getAccount: wrappedGetAccount,
  }), [arg, wrappedCreateAccount, wrappedGetAccount]);

  return res;
};
