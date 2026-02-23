import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "../../_lib/db"
import { QuizInfo } from "../../_lib/definition";

export async function GET(req: NextRequest) {
  try {
    const db = await connectToDatabase();
    const collection = await db.collection<QuizInfo>(`${process.env.QUIZ_COLLECTION_NAME}`);

    const searchParams = req.nextUrl.searchParams;

    const currentPage = Number(searchParams.get("page") || 1);
    const ITEMS_PER_PAGE = Number(process.env.ITEMS_PER_PAGE);
    const offset = ((currentPage - 1) * ITEMS_PER_PAGE);

    const quizePage = await collection.find({})
      .skip(offset)
      .limit(ITEMS_PER_PAGE)
      .toArray();

    const total = await collection.countDocuments({});
    const totalPages = Math.ceil(total / ITEMS_PER_PAGE);
    
    if (!quizePage) return NextResponse.json({ error: "Quizes not found." }, { status: 404 });

    return NextResponse.json({ quizes: quizePage, totalPages: totalPages });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}