// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { createSuccessfulResponseData } from '../../lib/data';
import type { ResponseData } from '../../lib/data';
import { prisma } from '../../lib/mongodb';
import { account } from '@prisma/client';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData<account[]>>,
) {
  res.setHeader('Content-Type', 'application/json');
  const accounts = await prisma.account.findMany();
  res.status(200).json(createSuccessfulResponseData( accounts));
}
