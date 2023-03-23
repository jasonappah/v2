export interface ILink {
  'Friendly Name': string;
  Slug: string;
  'Redirect URL': string;
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

export async function getLinks(): Promise<Record<string, ILink>> {
  const res = await fetch(
    `https://api.airtable.com/v0/${process.env
      .AIRTABLE_BASE_ID!}/${encodeURIComponent(
      process.env.AIRTABLE_TABLE_NAME!
    )}?&view=Grid%20view&filterByFormula=${encodeURIComponent('{Active}')}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_API_KEY!}`,
      },
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    }
  );
  const records = (await res.json()) as unknown as AirtableRes<ILink>;

  const links = {};
  for (const record of records.records) {
    if (record.fields.Slug !== '.') {
      links[record.fields.Slug] = record.fields;
    }
  }

  return links;
}
