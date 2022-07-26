import type { Account } from '@prisma/client';
import { get, post } from '../lib/request';

export async function getAccount() {
  return get({
    path:'account',
  });
}

export async function createAccount({ name, initialValue = 0, currentValue = 0 }: {
  name: string;
  initialValue?: number;
  currentValue?: number;
}) {
  await post<any, Account>(
    {
      path:'account',
      body:{
        name,
        initialValue,
        currentValue,
      },
    },
  );
}
