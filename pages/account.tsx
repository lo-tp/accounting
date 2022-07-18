import type { account } from '@prisma/client';
import type { NextPage } from 'next';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { Input, Modal, Table, TBody, TD, TH, THead, TR } from '../components';
import { get, post } from '../lib/request';

async function fetchAccount() {
  return get({
    path:'account',
  });
}

async function createAccount(name: string, initialValue = 0, currentValue = 0) {
  return post<any, account>(
    {
      path:'account',
      body:{
        name,
        initialValue,
        currentValue,
      },
    },
  );
}

const Home: NextPage<{ accounts: account[] }> = ({ accounts: originalAccounts }) => {
  const [open, setOpen] = useState(false);
  const [accountName, setAccountName] = useState('');
  const { data: accounts } = useQuery(['accounts'], fetchAccount, {
    initialData: originalAccounts,
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
        id="exampleModalCenter"
        title="New Account"
        onConfirm={() => {
          createAccount(accountName).then(account=>{
            setOpen(false);
            console.log(account);
          });
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

export async function getServerSideProps() {
  const res = await fetch('http://localhost:12000/api/account');
  const { data } = await res.json();

  return {
    props: { accounts:data },
  };
}
export default Home;
