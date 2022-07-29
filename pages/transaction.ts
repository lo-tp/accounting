import { getAccount } from '../apis/account';
import { getTransaction } from '../apis/transaction';
import { Transaction } from '../page/transaction';

export default Transaction;

export async function getServerSideProps() {
  const transactions = await getTransaction();
  const accounts = await getAccount();
  return {
    props: { accounts, transactions },
  };

}

