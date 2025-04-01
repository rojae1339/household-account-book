// app/api/signup/route.ts
import { NextResponse } from 'next/server';
import { insertFormUser } from '@/_lib/_user/actions';

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();
        const result = await insertFormUser({ email, password });
        return NextResponse.json({ success: true, result });
    } catch (error: any) {
        console.error('Signup Error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
