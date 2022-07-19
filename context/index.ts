import { createContext } from 'react';

//@ts-ignore
export const globalContext = createContext<{ setLoading: (loading: boolean)=> void }>();
