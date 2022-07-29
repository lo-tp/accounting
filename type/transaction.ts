import { Prisma } from '@prisma/client';

export type TransactionQueryType = Prisma.TransactionGetPayload<{
  include: {
    to: true,
    from: true,
  }
}>;
