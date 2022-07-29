import type { Prisma } from '@prisma/client';
import { FC, useMemo } from 'react';
import { useQuery } from 'react-query';
import { useGlobalContext } from '../../hook';
import { Table as TableComponent } from '../../components/';

type Transaction = Prisma.TransactionGetPayload<{
  include: {
    to: true,
    from: true,
  }
}>;

const config = [
  {
    id: 'amount',
    text: 'Amount',
  }, {
    id: 'fromName',
    text: 'From',
  }, {
    id: 'toName',
    text: 'To',
  },
];


export const Table: FC<{ data: Transaction[] }> = ({ data: originalData }) => {

  const globalContext = useGlobalContext();
  const { data: originalTransactions } = useQuery(['transactions'], globalContext.getTransaction, {
    initialData: originalData,
  });


  const transactions = useMemo(() => (originalTransactions ?? []).map( ({ to:{ name: toName }, from:{ name: fromName }, ...rest }) => ({
    ...rest, toName, fromName })), [originalTransactions]);

  return   <TableComponent config={config} data={transactions}/>;

};
