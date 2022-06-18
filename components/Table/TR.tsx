import { FC, ReactNode } from 'react';

export const TR: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <tr className='border-b last:border-b-0'>
      {children}
    </tr>
  );
};
