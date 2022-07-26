// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { createSuccessfulResponseData } from '../../lib/data';
import type { ResponseData } from '../../lib/data';
import { prisma } from '../../lib/mongodb';
import type { Account } from '@prisma/client';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData<Account[] | Account>>,
) {
  res.setHeader('Content-Type', 'application/json');
  if (req.method === 'GET') {
    const accounts = await prisma.account.findMany();
    res.status(200).json(createSuccessfulResponseData( accounts));
  } else if (req.method === 'POST') {
    const { name, currentValue = 0, initialValue = 0 } = req.body;

    const newAccount = await prisma.account.create({
      data:{
        name,
        currentValue,
        initialValue,
      },
    });
    res.status(200).json(createSuccessfulResponseData(newAccount));
  }
}
