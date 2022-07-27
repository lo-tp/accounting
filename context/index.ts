import { createContext, RefObject } from 'react';
import { createAccount, getAccount } from '../apis/account';
import type { LoadingIndicatorRef, ToastRef } from '../components';

export interface GlobalContext {
  loadingIndicatorRef: RefObject<LoadingIndicatorRef>;
  toastRef: RefObject<ToastRef>
  createAccount: typeof createAccount,
  getAccount: typeof getAccount,
}


//@ts-ignore
export const globalContext = createContext<Context>();
