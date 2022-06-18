import { FC, ReactNode } from 'react';

export const TH: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <th className='border-r p-4 last:border-r-0'>
      {children}
    </th>
  );
};
