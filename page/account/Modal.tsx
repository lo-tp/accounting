import React, { useState, useCallback, useImperativeHandle } from 'react';
import { createAccount } from '../../apis/account';
import { Modal as ModalComponent, Input } from '../../components/';
import { useGlobalContext } from '../../hook';
import { useMutation, useQueryClient } from 'react-query';

export interface ModalRef { open: ()=> void }

export const Modal = React.forwardRef<ModalRef>( ( _, ref) => {
  const queryClient = useQueryClient();
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

  useImperativeHandle(ref, () => {
    return {
      open: () => setOpen(true),
    };
  }, [setOpen]);

  const newAccountMutation = useMutation(wrappedCreateAccount, {
    onSuccess: (newAccount) => {
      queryClient.setQueryData(['accounts'], (old: any) => {
        return [...old, newAccount];
      });
      setOpen(false);
    },
  });

  return (
    <ModalComponent
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
    </ModalComponent>
  );
});

Modal.displayName = 'NewAccountModal';
