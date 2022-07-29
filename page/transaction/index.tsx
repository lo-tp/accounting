import { useRef, useCallback } from 'react';
import type { Account } from '@prisma/client';
import type { NextPage } from 'next';
import { TransactionQueryType } from '../../type';
import { Table } from './Table';
import { Modal } from './Modal';
import type { ModalRef } from './Modal';
import { PrimaryButton } from '../../components';


export const Transaction: NextPage<{ transactions: TransactionQueryType[];accounts: Account[] }> = ({ transactions, accounts }) => {
  const modalRef = useRef<ModalRef>(null);
  const openModal = useCallback(() => {
    modalRef.current?.open();
  }, [modalRef]);


  return (<div className='mx-auto'>
    <div className='flex pb-4'>
      <h1 className='font-bold text-2xl grow'>Transactions</h1>
      <PrimaryButton onClick={openModal}>
        Create New Transaction
      </PrimaryButton>
      <Modal ref={modalRef} accounts={accounts}/>
    </div>
    <Table data={transactions}/>
  </div>
  );
};
