import { notFound, redirect } from 'next/navigation';
import { getLinks } from '../../lib/server/getLinks';

export const dynamic = 'error';

async function LinkShortener({ params }: { params: { redirectSlug: string } }) {
  const { redirectSlug } = params;
  const links = await getLinks();

  if (!redirect) notFound();

  const link = links[redirectSlug];
  if (link) {
    redirect(link['Redirect URL']);
  } else {
    notFound();
  }
}

export async function generateStaticParams() {
  return Object.keys(await getLinks()).map((redirectSlug) => ({
    redirectSlug,
  }));
}

export default LinkShortener;
