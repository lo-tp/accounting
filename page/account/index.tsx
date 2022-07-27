import type { Account as AccountType } from '@prisma/client';
import type { NextPage } from 'next';
import { useCallback, useState } from 'react';
import { useMutation } from 'react-query';
import { Table } from './Table';
import { createAccount } from '../../apis/account';
import { Modal, Input } from '../../components/';
import { useGlobalContext } from '../../hook';
import { queryClient } from '../../pages/_app';



export const Account: NextPage<{ accounts: AccountType[] }> = ({ accounts }) => {
  const [open, setOpen] = useState(false);
  const [accountName, setAccountName] = useState('');
  const globalContext = useGlobalContext();

  const wrappedCreateAccount = useCallback<typeof createAccount>(async (arg) => {
    try {
      const res = await globalContext.createAccount(arg);
      setOpen(false);
      return res;
    } finally {
      setAccountName('');
    }
  }, [setOpen, setAccountName, globalContext]);

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
          Create New Account
        </button>

      </div>
      <Table accounts={accounts}/>
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
