import dbConnect from '@/lib/mongodb';
import Transaction from '@/models/transaction';
import { NextResponse } from 'next/server';

export async function GET() {
  await dbConnect();

  try {
    const transactions = await Transaction.find({});
    return NextResponse.json(transactions);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 500 });
  }
}

export async function POST(request) {
  await dbConnect();

  try {
    const body = await request.json();
    const transaction = await Transaction.create(body);
    return NextResponse.json(transaction, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create transaction' }, { status: 400 });
  }
}
