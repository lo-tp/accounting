import { getAccount } from '../apis/account';
import { Transaction } from '../page/transaction';

export default Transaction;

export async function getServerSideProps() {
  const accounts = await getAccount();
  return {
    props: { accounts },
  };

}

