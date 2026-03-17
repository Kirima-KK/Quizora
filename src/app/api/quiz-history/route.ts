import { connectToDatabase } from "@/app/_lib/db";
import { UserQuizAnswer } from "@/app/_lib/definition";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Save to the quiz history database
    const data = await req.json();
    const db = await connectToDatabase();
    const quizHistoryCollection = await db.collection(`${process.env.QUIZ_HISTORY_COLLECTION_NAME}`);
    const userCollection = await db.collection(`${process.env.USER_COLLECTION_NAME}`);

    const newHistory = await quizHistoryCollection.insertOne({
      quizId: data.quizId,
      userId: data.userId,
      answers: data.answers,
      submittedDate: new Date().toISOString().split("T")[0],
      score: data.score,
      quizStatus: data.quizStatus
    });

    // Updated user data
    const item = await userCollection.findOne({ _id: new ObjectId(data.userId) });
    if (!item) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    let quizPassed = data.quizStatus ? 1 : 0;
    let correctAnswers = data.answers.reduce((acc: number, answer: UserQuizAnswer) => {
      return answer.isCorrect ? acc + 1 : acc;
    }, 0);

    const updatedUser = await userCollection.findOneAndUpdate(
      { _id: new ObjectId(data.userId) },
      {
        $inc: {
          quizPassed: quizPassed,
          correctAnswers: correctAnswers
        }
      },
      { returnDocument: 'after' }
    );

    return NextResponse.json({ message: 'Save new quiz history success.', data: newHistory }, { status: 200 });
  } catch (e) {
    console.error('Internal Error', e);
    return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
  }
}