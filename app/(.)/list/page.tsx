import Signature from '../../../components/Signature';
import { getLinks } from '../../../lib/server/getLinks';

export const dynamic = 'error';

async function LinkList() {
  const links = Object.values(await getLinks()).filter((link) => link.Public);
  return (
    <div className="flex flex-col gap-8 items-center">
      <Signature />
      {links.map((link) => (
        <button key={link.Slug} type="button">
          <a
            className="p-4 w-full h-full bg-accent text-back hover:bg-back hover:text-accent transition border border-accent"
            href={link['Redirect URL']}
          >
            {link['Friendly Name']}
          </a>
        </button>
      ))}
    </div>
  );
}

export default LinkList;
