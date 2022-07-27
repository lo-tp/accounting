import type { Account as AccountType } from '@prisma/client';
import type { FC } from 'react';
import { useQuery } from 'react-query';
import { useGlobalContext } from '../../hook';
import { Table as TableComponent } from '../../components/';

const config = [
  {
    id: 'name',
    text: 'Name',
  }, {
    id: 'currentValue',
    text: 'Current Value',
  }, {
    id: 'initialValue',
    text: 'Initial Value',
  },
];

export const Table: FC<{ accounts: AccountType[] }> = ({ accounts: originalAccounts }) => {

  const globalContext = useGlobalContext();
  const { data: accounts } = useQuery(['accounts'], globalContext.getAccount, {
    initialData: originalAccounts,
  });

  return   <TableComponent config={config} data={accounts}/>;

};
