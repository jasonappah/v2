import { NextApiRequest, NextApiResponse } from 'next';
import { revalidatePath, updateTag } from 'next/cache';

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
    updateTag('urlShortenerLinks')
    revalidatePath('/[redirectSlug]', 'page')
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).send('Error revalidating');
  }
}
