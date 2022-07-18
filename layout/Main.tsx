import { FC, ReactNode } from 'react';

export const Main: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <main className='flex container h-full'>{
      children
    }</main>
  );
};
