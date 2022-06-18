import type { account } from '@prisma/client';
import type { NextPage } from 'next';
import { Table, TBody, TD, TH, THead, TR } from '../components';

const data = [
  {
    name: 'Jack',
    id: 'iam1',
    currentValue: 123,
    initialValue: 456,
  },
  {
    name: 'Luice',
    id: 'iam2',
    currentValue: 123,
    initialValue: 456,
  },
  {
    name: 'Tom',
    id: 'iam3',
    currentValue: 123,
    initialValue: 456,
  },
  {
    name: 'Jade',
    id: 'iam',
    currentValue: 123,
    initialValue: 456,
  },
];

const Home: NextPage<{ accounts: account[] }> = ({ accounts }) => {
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
          {data.map(({ id, name, initialValue, currentValue }) => (
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
