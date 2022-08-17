import { AirtablePlusPlus, AirtablePlusPlusRecord } from 'airtable-plusplus';

interface ILink {
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
  const links = (await airtable.read({
    filterByFormula: '{Active}',
  })) as unknown as AirtablePlusPlusRecord<ILink>[];

  const yeah = {};
  for (const record of links) {
    yeah[record.fields.Slug] = record.fields;
  }

  return yeah;
}
