import { createContext } from 'react';

interface Context {
  setLoading: (loading: boolean)=> void 
  showToast: (arg: { text: string })=> void 
}

//@ts-ignore
export const globalContext = createContext<Context>();
