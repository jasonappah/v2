import { NotionAPI } from 'notion-client';
import { getAllPagesInSpace, getPageTitle, parsePageId } from 'notion-utils';

import { notFound, redirect, useRouter } from 'next/navigation';
import { Metadata } from 'next';
import Signature from '../../../components/Signature';
import NotionRenderer from '../../../components/Notion';

const notion = new NotionAPI();

export const revalidate = 60;

type Props = { params: { page: string } };
async function Page({ params }: Props) {
  const { page } = params;
  const id = parsePageId(page);
  if (id !== page) return redirect(id);

  const recordMap = await notion.getPage(id);
  if (!recordMap) return notFound();

  const title = getPageTitle(recordMap);
  // console.log(recordMap.block)

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

const defaultMapPageUrl = (rootPageId?: string) => (p: string) => {
  const pageId = (p || '').replaceAll(/-/g, '');

  if (rootPageId && pageId === rootPageId) {
    return '/';
  }
  return `/${pageId}`;
};

export async function generateStaticParams() {
  const mapPageUrl = defaultMapPageUrl(process.env.NOTION_BASE_PAGE_ID);
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { page } = params;
  const id = parsePageId(page);
  if (id !== page) return redirect(id);

  const recordMap = await notion.getPage(id);
  if (!recordMap) return notFound();

  const title = getPageTitle(recordMap);

  return {
    title,
  };
}

export default Page;
