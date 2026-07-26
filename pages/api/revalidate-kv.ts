import { NextApiRequest, NextApiResponse } from 'next';
import { revalidatePath, revalidateTag } from 'next/cache';
import { KV_CACHE_TAG } from '../../lib/server/getKV';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (
    !req.headers.authorization ||
    req.headers.authorization !==
      `Bearer ${process.env.REVALIDATION_TOKEN || ''}`
  ) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  try {
    revalidateTag(KV_CACHE_TAG, 'max')
    revalidatePath('/links/[nfcKey]', 'page')
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).send('Error revalidating');
  }
}
