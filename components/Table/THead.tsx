import { FC, ReactNode } from 'react';

export const THead: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <thead className='border'>{children}</thead>
  );
};
