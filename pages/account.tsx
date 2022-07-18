import { Account, fetchAccount } from '../page/account';

export default Account;


export async function getServerSideProps() {
  const accounts = await fetchAccount();
  return {
    props: { accounts },
  };

}
