import { useContext } from 'react';
import { globalContext } from '../context';

export const useGlobalContext = () => useContext(globalContext);
