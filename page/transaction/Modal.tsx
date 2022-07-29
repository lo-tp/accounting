import type { Account } from '@prisma/client';
import React, { useState, useCallback, useImperativeHandle, useMemo } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { createTransaction } from '../../apis/transaction';
import { Modal as ModalComponent, Select, Input } from '../../components/';
import { useGlobalContext } from '../../hook';
import { TransactionQueryType } from '../../type';

export interface ModalRef { open: ()=> void }

export const Modal = React.forwardRef<ModalRef, { accounts: Account[] }>( ( { accounts }, ref) => {
  const [amount, setAmount] = useState(0);
  const [open, setOpen] = useState(false);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');


  const globalContext = useGlobalContext();
  const wrappedCreateTransaction = useCallback<typeof createTransaction>(async (arg) => {
    try {
      const res = await globalContext.createTransaction(arg);
      setOpen(false);
      return res;
    } finally {
      setAmount(0);
    }
  }, [setOpen, setAmount, globalContext]);

  const queryClient = useQueryClient();
  const newTransactionMutation = useMutation(wrappedCreateTransaction, {
    onSuccess: (newData) => {
      queryClient.setQueryData(['transactions'],
        (oldData: TransactionQueryType[] | undefined) => (oldData ? [...oldData, newData] : [newData]));
      setOpen(false);
    },
  });

  const onConfirm = useCallback(() => {
    newTransactionMutation.mutate({
      amount,
      from,
      to,
    });
  }, [amount, from, to, newTransactionMutation]);



  useImperativeHandle(ref, () => {
    return {
      open: () => setOpen(true),
    };
  }, [setOpen]);


  const options = useMemo(() => accounts.map(({ id, name }) => ({
    value: id,
    text: name,
  })), [accounts]);
  return (
    <ModalComponent
      open={open}
      title="New Account"
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
    </ModalComponent>
  );
});

Modal.displayName = 'NewAccountModal';
