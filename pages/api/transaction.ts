// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { createSuccessfulResponseData } from '../../lib/data';
import type { ResponseData } from '../../lib/data';
import { prisma } from '../../lib/mongodb';
import type { Transaction } from '@prisma/client';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData<Transaction[] | Transaction>>,
) {
  res.setHeader('Content-Type', 'application/json');
  if (req.method === 'POST') {
    const { amount, from, to } = req.body;

    const newTransaction = await prisma.transaction.create({
      data:{
        amount,
        from: {
          connect: { id: from },
        },
        to: {
          connect: { id: to },
        },
      },
    });
    res.status(200).json(createSuccessfulResponseData(newTransaction));
  }
}
