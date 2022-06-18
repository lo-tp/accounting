import { FC, ReactNode } from 'react';

export const TBody: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <tbody>{children}</tbody>
  );
};
