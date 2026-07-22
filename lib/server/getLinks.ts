import { Client as NotionAPIClient, isFullPageOrDataSource } from "@notionhq/client";
import { DataSourceObjectResponse, EmptyObject, PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { cacheTag } from "next/cache";

export interface ILink {
  "Friendly Name": string;
  Slug: string;
  "Redirect URL": string;
  Description: string;
  Active: boolean;
  Public: boolean;
}

interface AirtableRes<T> {
  records: {
    id: string;
    createdTime: string;
    fields: T;
  }[];
}

async function getLinksFromAirtable(): Promise<Record<string, ILink>> {
  "use cache";
  cacheTag("urlShortenerLinks")
  const res = await fetch(
    `https://api.airtable.com/v0/${process.env
      .AIRTABLE_BASE_ID!}/${encodeURIComponent(
      process.env.AIRTABLE_TABLE_NAME!
    )}?&view=Grid%20view&filterByFormula=${encodeURIComponent("{Active}")}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_API_KEY!}`,
      },
    }
  );
  const records = (await res.json()) as unknown as AirtableRes<ILink>;

  const links: Record<string, ILink> = {};
  for (const record of records.records) {
    if (record.fields.Slug !== ".") {
      links[record.fields.Slug] = record.fields;
    }
  }

  return links;
}

const notionClient = new NotionAPIClient({
  auth: process.env.NOTION_TOKEN,
});

const getLinksFromNotion: () => Promise<Record<string, ILink>> = 
  async () => {
    "use cache";
    cacheTag("urlShortenerLinks")
    const dbId = process.env.NOTION_URL_SHORTENER_DATABASE_ID;
    if (!dbId) {
      throw new Error("NOTION_URL_SHORTENER_DATABASE_ID is not set");
    }
    const urlShortenerNotionPages = await notionClient.dataSources.query({
      data_source_id: dbId,
      filter: {
        type: "checkbox",
        "property": "Active",
        checkbox: {
          equals: true
        }
      }
    });

    const links: Record<string, ILink> = {};
    for (const result of urlShortenerNotionPages.results) {
      if (!isFullPageOrDataSource(result)) { continue }
      const flattenedFields = _flattenNotionPageProperties<ILink>(result.properties)

      if (flattenedFields.Slug !== ".") {
        links[flattenedFields.Slug] = flattenedFields;
      }
    }
  
    return links
  }

// Turns Notion property map with detailed meta (ex: id, rich text formating) into 
// simple key -> primitive (string/boolean) map for easier access
function _flattenNotionPageProperties<PropertySchema>
  (properties: (DataSourceObjectResponse | PageObjectResponse)["properties"]): PropertySchema {
  return Object.entries(properties).reduce((acc, [key, notionProperty]: [string, (typeof properties)[keyof typeof properties]] ) => {
    let unwrappedValue: string | boolean | EmptyObject | null
    if (!notionProperty) return acc
    switch (notionProperty.type) {
      case "url":
        unwrappedValue = notionProperty.url
        break;
      case "checkbox":
        unwrappedValue = notionProperty.checkbox
        break;
      case "title":
        unwrappedValue = notionProperty.title.map((item) => item.plain_text).join("")
        break;
      case "rich_text":
        unwrappedValue = notionProperty.rich_text.map((item) => item.plain_text).join("")
        break;
      case "button":
        unwrappedValue = notionProperty.button
        break
      default:
        unwrappedValue = null
        console.warn(`Got Notion property of unhandled type ${notionProperty.type}`)
    }
    if (unwrappedValue === null || _isEmptyObject(unwrappedValue)) {
      return acc
    } else {
      return {
        ...acc, [key]: unwrappedValue
      }
    }

  }, {} as PropertySchema)
}


function _isEmptyObject(object: any) : object is EmptyObject {
  return Object.is(object, {})
}

export const getLinks = getLinksFromNotion