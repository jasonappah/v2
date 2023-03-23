import { NextApiRequest, NextApiResponse } from 'next';

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
    await res.revalidate('/links/json');
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).send('Error revalidating');
  }
}
