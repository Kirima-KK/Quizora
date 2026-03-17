import { connectToDatabase } from "@/app/_lib/db";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const db = await connectToDatabase();
    const collection = db.collection(`${process.env.QUIZ_COLLECTION_NAME}`);
    const param = await params;

    const quiz = await collection.findOne({ _id: new ObjectId(param.id) });
    if (!quiz) return NextResponse.json({ error: 'Quiz not found' }, { status: 404 });

    return NextResponse.json(quiz);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'internal error' }, { status: 500 });
  }
}