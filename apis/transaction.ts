import type { Transaction } from '@prisma/client';
import { get, post } from '../lib/request';

export async function getTrsansaction() {
  return get({
    path:'transaction',
  });
}


export async function createTransaction({ amount, from, to }: {
  amount: number;
  from: string;
  to: string;
}) {
  return post<any, Transaction>(
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
