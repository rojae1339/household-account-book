// app/api/transactions/route.ts
import { NextResponse } from 'next/server';
import { getAllTransactionsByUserId } from '@/app/api/ledger/_service/transactionService';

export async function GET() {
    const transactions = await getAllTransactionsByUserId();

    if (transactions instanceof Error) {
        return NextResponse.json(null);
    }

    return NextResponse.json(transactions);
}
