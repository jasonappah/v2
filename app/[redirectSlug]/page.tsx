import { notFound, redirect } from 'next/navigation';
import { getLinks } from '../../lib/server/getLinks';

async function LinkShortener(props: { params: Promise<{ redirectSlug: string }> }) {
  const params = await props.params;
  const { redirectSlug } = params;
  const links = await getLinks();

  if (!redirectSlug) notFound();

  const link = links[redirectSlug];
  if (link) {
    console.log(link['Redirect URL']);
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
