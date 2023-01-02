import { AirtablePlusPlus, AirtablePlusPlusRecord } from 'airtable-plusplus';

export interface ILink {
  'Friendly Name': string;
  Slug: string;
  'Redirect URL': string;
  Description: string;
  Active: boolean;
  Public: boolean;
}

export async function getLinks(): Promise<Record<string, ILink>> {
  const airtable = new AirtablePlusPlus({
    apiKey: process.env.AIRTABLE_KEY,
    baseId: process.env.AIRTABLE_BASE_ID,
    tableName: 'Table 1',
  });
  const records = (await airtable.read({
    filterByFormula: '{Active}',
  })) as unknown as AirtablePlusPlusRecord<ILink>[];

  const links = {};
  for (const record of records) {
    if (record.fields.Slug !== '.') {
      links[record.fields.Slug] = record.fields;
    }
  }

  return links;
}
