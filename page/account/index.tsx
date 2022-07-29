import type { Account as AccountType } from '@prisma/client';
import type { NextPage } from 'next';
import { useCallback, useRef } from 'react';
import type { ModalRef } from './Modal';
import { Modal } from './Modal';
import { Table } from './Table';
import { PrimaryButton } from '../../components';



export const Account: NextPage<{ accounts: AccountType[] }> = ({ accounts }) => {
  const modalRef = useRef<ModalRef>(null);
  const openModal = useCallback(() => {
    modalRef.current?.open();
  }, [modalRef]);
  return (
    <div className='mx-auto'>
      <div className='flex pb-4'>
        <h1 className='font-bold text-2xl grow'>Accounts</h1>
        <PrimaryButton onClick={openModal}>
          Create New Account
        </PrimaryButton>

      </div>
      <Table accounts={accounts}/>
      <Modal ref={modalRef} />
    </div>
  );
};
