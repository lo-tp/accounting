import { useRef, useCallback } from 'react';
import type { Account } from '@prisma/client';
import type { NextPage } from 'next';
import { TransactionQueryType } from '../../type';
import { Table } from './Table';
import { Modal } from './Modal';
import type { ModalRef } from './Modal';


export const Transaction: NextPage<{ transactions: TransactionQueryType[];accounts: Account[] }> = ({ transactions, accounts }) => {
  const modalRef = useRef<ModalRef>(null);
  const openModal = useCallback(() => {
    modalRef.current?.open();
  }, [modalRef]);


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
        onClick={openModal}
      >
        Create New Transaction
      </button>


      <Modal ref={modalRef} accounts={accounts}/>
    </div>
    <Table data={transactions}/>
  </div>
  );
};
