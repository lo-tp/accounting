import { FC, ReactNode } from 'react';

export const TD: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <td className='border-r p-4 last:border-r-0'>
      {children}
    </td>
  );
};
