import { connectToDatabase } from "@/app/_lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest
  , { params }: { params: Promise<{ id: string }> }
) {
  try {
    const param = await params;
    const db = await connectToDatabase();
    const collection = await db.collection(`${process.env.QUIZ_HISTORY_COLLECTION_NAME}`);

    const histories = await collection.find({ userId: param.id }).toArray();
    return NextResponse.json({ quizHistory: histories }, { status: 200 });
  } catch (e) {
    console.error('Internal Error', e);
    return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
  }
}