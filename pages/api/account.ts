// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { createSuccessfulResponseData } from '../../lib/data';
import type { ResponseData } from '../../lib/data';


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData<{ name: string }>>,
) {
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(createSuccessfulResponseData( { name: 'John Lotp' }));
}
