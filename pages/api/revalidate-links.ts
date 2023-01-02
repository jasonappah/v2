import { NextApiRequest, NextApiResponse } from 'next';
import { getLinks } from '../../lib/server/getLinks';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query.secret !== process.env.REVALIDATION_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  try {
    if (req.query.slug) {
      await res.revalidate(`/${req.query.slug as string}`);
    } else {
      const slugs = Object.keys(await getLinks()).map((slug) =>
        res.revalidate(`/${slug}`)
      );
      await Promise.all(slugs);
    }
    await res.revalidate('/list');
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).send('Error revalidating');
  }
}
