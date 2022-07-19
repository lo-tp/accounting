/** eslint-disable react/jsx-no-undef */
import type { account } from '@prisma/client';
import type { NextPage } from 'next';
import { useCallback, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { createAccount, getAccount } from '../../apis/account';
import { Modal, Input, Table } from '../../components/';
import { useGlobalContext } from '../../hook';
import { queryClient } from '../../pages/_app';


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

export const Account: NextPage<{ accounts: account[] }> = ({ accounts: originalAccounts }) => {
  const [open, setOpen] = useState(false);
  const [accountName, setAccountName] = useState('');
  const { setLoading } = useGlobalContext();
  const wrappedGetAccount = useCallback(async () => {
    setLoading(true);
    try {
      return await getAccount();
    } finally {
      setLoading(false);
    }

  }, [setLoading]);
  const wrappedCreateAccount = useCallback(async (arg: Parameters<typeof createAccount>[0]) => {
    setLoading(true);
    try {
      const res = await createAccount(arg);
      setOpen(false);
      return res;
    } finally {
      setLoading(false);
    }

  }, [setLoading, setOpen]);
  const { data: accounts } = useQuery(['accounts'], wrappedGetAccount, {
    initialData: originalAccounts,
  });
  const newAccountMutation = useMutation(wrappedCreateAccount, {
    onSuccess: () => {
      queryClient.invalidateQueries(['accounts']);
      setOpen(false);
    },
  });
  return (
    <div className='mx-auto'>
      <div className='flex pb-4'>
        <h1 className='font-bold text-2xl grow'>Accounts</h1>
        <button
          type="button" className="px-6
      py-2.5
      bg-blue-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-blue-700 hover:shadow-lg
      focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-800 active:shadow-lg
      transition
      duration-150
      ease-in-out" 
          onClick={() => setOpen(true)}
        >
          Hello
        </button>

      </div>
      <Table config={config} data={accounts}/>
      <Modal
        open={open}
        title="New Account"
        onConfirm={() => {
          newAccountMutation.mutate( { name:accountName } );
        }}
        onCancel={() => setOpen(false)}
      >
        <Input
          value={accountName}
          onChange={setAccountName}
          label="Account Name"
        />
      </Modal>
    </div>
  );
};
