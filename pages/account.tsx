import type { account } from '@prisma/client';
import type { NextPage } from 'next';

const Home: NextPage<{ accounts: account[] }> = ({ accounts }) => {
  return (
    <ul>
      {accounts.map(({ id, name, initialValue, currentValue }) => (
    <li key={id}>
    <span>{name}</span>
    <span> {initialValue}</span>
    <span> {currentValue}</span>
    </li>
      ))}
    </ul>
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
