import { connectToDatabase } from '@/app/_lib/db';
import { verifyJwt } from '@/app/_lib/jwt';
import { ObjectId } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('session')?.value;
    const payload = token ? await verifyJwt(token) : null;
    if (!payload) {
      return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });
    }

    const db = await connectToDatabase();
    const collection = db.collection(`${process.env.USER_COLLECTION_NAME}`);
    const userId: string = payload?.payload.userId;
    const user = await collection.findOne({ _id: new ObjectId(userId) });
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    return NextResponse.json(user);
  } catch (e) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
