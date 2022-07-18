import { getAccount } from '../apis/account';
import { Account } from '../page/account';

export default Account;


export async function getServerSideProps() {
  const accounts = await getAccount();
  return {
    props: { accounts },
  };

}
