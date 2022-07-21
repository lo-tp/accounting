import { createContext, RefObject } from 'react';
import type { LoadingIndicatorRef, ToastRef } from '../components';

interface Context {
  loadingIndicatorRef: RefObject<LoadingIndicatorRef>;
  toastRef: RefObject<ToastRef>
}

const noop = () => {};
const initialValue = {
  loadingIndicatorRef: { current:
   { setLoading: noop } }, toastRef:{ current: { showToast: noop } },
};

export const globalContext = createContext<Context>(initialValue);
