import { getAccount } from '../apis/account';
import { getTrsansaction } from '../apis/transaction';
import { Transaction } from '../page/transaction';

export default Transaction;

export async function getServerSideProps() {
  const transactions = await getTrsansaction();
  const accounts = await getAccount();
  return {
    props: { accounts, transactions },
  };

}

