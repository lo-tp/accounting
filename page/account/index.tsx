import type { account } from '@prisma/client';
import type { NextPage } from 'next';
import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { createAccount, getAccount } from '../../apis/account';
import { Input, Modal, Table, TBody, TD, TH, THead, TR } from '../../components';
import { queryClient } from '../../pages/_app';


export const Account: NextPage<{ accounts: account[] }> = ({ accounts: originalAccounts }) => {
  const [open, setOpen] = useState(false);
  const [accountName, setAccountName] = useState('');
  const { data: accounts } = useQuery(['accounts'], getAccount, {
    initialData: originalAccounts,
  });
  const newAccountMutation = useMutation(createAccount, {
    onSuccess: () => {
      queryClient.invalidateQueries(['accounts']);
      setOpen(false);
    },
  });
  return (
    <div className='container mx-auto py-6'>
      <Table>
        <THead>
          <TR>
            <TH >name</TH>
            <TH >Current Value</TH>
            <TH >Initial Value</TH>
          </TR>
        </THead>
        <TBody>
          {accounts.map(({ id, name, initialValue, currentValue }) => (
            <TR
              key={id}
            >
              <TD > {name}</TD>
              <TD > {currentValue}</TD>
              <TD > {initialValue}</TD>
            </TR>
          ))}
        </TBody>
      </Table>
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
  );
};
