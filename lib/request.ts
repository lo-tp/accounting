interface GetProps {
  path: string;
}

const URL = 'http://localhost:12000/api/';

export async function get<T=any>({
  path,
}: GetProps) {
  const res = await fetch(`${URL}/${path}`);
  const { data } = await res.json();
  return data as T;
}

interface PostProps<T=any> {
  path: string;
  body: T;
}

export async function post<T=any, K=any>({
  path,
  body,
}: PostProps<T>) {
  const arg = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };
  const res = await fetch(`${URL}/${path}`, arg);

  const { data } = await res.json();
  return data as K;
}
