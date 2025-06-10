import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const currency = searchParams.get('currency');
  const data = await fetch(
    'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json'
  );
  const dataJson = await data.json();
  const exchangeRate = dataJson.find((item: any) => item.cc === currency);
  return NextResponse.json(exchangeRate);
}
