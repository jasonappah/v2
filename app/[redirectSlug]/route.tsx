import { notFound, redirect } from 'next/navigation';
import { getLinks } from '../../lib/server/getLinks';

export async function GET(_: Request, props: { params: Promise<{ redirectSlug: string }> }) {
  const params = await props.params;
  const { redirectSlug } = params;
  const links = await getLinks();

  if (!redirectSlug) notFound();

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

export const dynamic = 'force-static'; // Forces static caching 
