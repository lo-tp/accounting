import { FC, ReactNode } from 'react';

export const Table: FC<{ children: ReactNode }> = ({ children }) => {
  return (<table className='border'>
    {children}
  </table>
  );
};

export { TBody } from './TBody';
export { TD } from './TD';
export { TH } from './TH';
export { THead } from './THead';
export { TR } from './TR';
