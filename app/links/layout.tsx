import Email from '../../components/Email';
import Signature from '../../components/Signature';
import { getLinks, getPublicLinkOrderingFromNotion, ILink } from '../../lib/server/getLinks';

export const dynamic = 'error';

async function LinkList({children}: LayoutProps<'/links'>) {
  const linkSlugToLinkPayloadMap = getLinks();
  const publicLinkOrdering = getPublicLinkOrderingFromNotion();

  const linkIdToLinkPayloadMap = Object.values(await linkSlugToLinkPayloadMap).reduce((mapping, link) => {
    mapping[link._id] = link
    return mapping
  }, {} as Record<string, ILink>)
  const orderedLinks = (await publicLinkOrdering).map(linkId => linkIdToLinkPayloadMap[linkId])
  console.log(orderedLinks.map(link => `${link._id} -> ${link["Friendly Name"]}`))
  return (
    <div className="flex flex-col gap-8 items-center">
      <Signature />
      <div className="flex flex-col gap-2 items-center">
        <Email />
        {children}
      </div>
      {orderedLinks.map((link) => (
        <button key={link._id} type="button">
          <a
            className="p-4 w-full h-full bg-accent text-back hover:bg-back hover:text-accent transition border border-accent"
            href={link['Redirect URL']}
            target='_blank'
          >
            {link['Friendly Name']}
          </a>
        </button>
      ))}
    </div>
  );
}

export default LinkList;
