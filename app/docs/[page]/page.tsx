import { NotionAPI } from 'notion-client';
import { getAllPagesInSpace, getPageTitle } from 'notion-utils';

import { notFound } from 'next/navigation';
import Signature from '../../../components/Signature';
import NotionRenderer from '../../../components/Notion';

const notion = new NotionAPI();

export const revalidate = 60;

async function Page({ params }: { params: { page: string } }) {
  const { page } = params;
  const recordMap = await notion.getPage(page);
  if (!recordMap) return notFound();

  const title = getPageTitle(recordMap);

  return (
    <div className="flex flex-col gap-8 w-screen px-24 items-center">
      <Signature />
      <h1 className="font-bold text-4xl">{title}</h1>
      <div className="w-min">
        <NotionRenderer recordMap={recordMap} darkMode previewImages />
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const mapPageUrl = (page: string) => `/docs/${page}`;
  const pages = await getAllPagesInSpace(
    process.env.NOTION_BASE_PAGE_ID as string,
    process.env.NOTION_SPACE_ID,
    (...args) => notion.getPage(...args),
    {
      traverseCollections: true,
    }
  );

  const paths = Object.keys(pages)
    .map((pageId) => mapPageUrl(pageId))
    .filter((path) => path && path !== '/');

  return paths.map((path) => ({ page: path }));
}

export default Page;
