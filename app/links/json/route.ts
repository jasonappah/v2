import { NextResponse } from 'next/server';
import { getLinks } from '../../../lib/server/getLinks';

export async function GET() {
  return NextResponse.json(await getLinks());
}
