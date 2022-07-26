import type { Account } from '@prisma/client';
import type { NextPage } from 'next';
import { useMemo, useState } from 'react';
import { createTransaction } from '../../apis/transaction';
import { Modal, Input, Select } from '../../components';

export const Transaction: NextPage<{ accounts: Account[] }> = ({ accounts }) => {
  const [open, setOpen] = useState(true);
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const options = useMemo(() => accounts.map(({ id, name }) => ({
    value: id,
    text: name,
  })), [accounts]);
  console.log(options);
  const onConfirm = () => {
    createTransaction({
      amount,
      from,
      to,
    });
  };

  return (<div className='mx-auto'>
    <div className='flex pb-4'>
      <h1 className='font-bold text-2xl grow'>Transactions</h1>
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
        Create New Transaction
      </button>

      <Modal
        open={open}
        title="New Transaction"
        onConfirm={onConfirm}
        onCancel={() => setOpen(false)}
      >
        <Input
          value={amount}
          onChange={setAmount}
          label="Amount"
        />
        <Select 
          options={options}
          onChange={setFrom}
          value={from}
          label='From'
        />
        <Select 
          options={options}
          onChange={setTo}
          value={to}
          label='To'
        />
      </Modal>
    </div>
  </div>
  );
};
