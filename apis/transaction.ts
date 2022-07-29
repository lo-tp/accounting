import { get, post } from '../lib/request';
import { TransactionQueryType } from '../type';

export async function getTransaction() {
  return get<TransactionQueryType[]>({
    path:'transaction',
  });
}


export async function createTransaction({ amount, from, to }: {
  amount: number;
  from: string;
  to: string;
}) {
  return post<any, TransactionQueryType>(
    {
      path:'transaction',
      body:{
        amount,
        from,
        to,
      },
    },
  );
}
