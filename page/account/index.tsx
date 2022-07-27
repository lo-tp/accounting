import type { Account as AccountType } from '@prisma/client';
import type { NextPage } from 'next';
import { useCallback, useRef } from 'react';
import type { ModalRef } from './Modal';
import { Modal } from './Modal';
import { Table } from './Table';



export const Account: NextPage<{ accounts: AccountType[] }> = ({ accounts }) => {
  const modalRef = useRef<ModalRef>(null);
  const openModal = useCallback(() => {
    modalRef.current?.open();
  }, [modalRef]);
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
          onClick={openModal}
        >
          Create New Account
        </button>

      </div>
      <Table accounts={accounts}/>
      <Modal ref={modalRef} />
    </div>
  );
};
