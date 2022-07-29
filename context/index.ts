import { createContext, RefObject } from 'react';
import { createAccount, getAccount } from '../apis/account';
import { createTransaction, getTransaction } from '../apis/transaction';
import type { LoadingIndicatorRef, ToastRef } from '../components';

export interface GlobalContext {
  loadingIndicatorRef: RefObject<LoadingIndicatorRef>;
  toastRef: RefObject<ToastRef>
  createAccount: typeof createAccount,
  getAccount: typeof getAccount,
  getTransaction: typeof getTransaction,
  createTransaction: typeof createTransaction,
}


//@ts-ignore
export const globalContext = createContext<Context>();
