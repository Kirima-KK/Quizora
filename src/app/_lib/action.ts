import { QuizHistoryItem } from "./definition";

export const postQuizResult = async (quizResult: QuizHistoryItem) => {
  const quizId = quizResult.quizId;
  const userId = quizResult.userId;
  const answers = quizResult.answers;
  const submittedDate = quizResult.submittedDate;
  const score = quizResult.score;
  const quizStatus = quizResult.quizStatus;

  try {
    const res = await fetch('/api/quiz-history', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quizId, userId, answers, submittedDate, score, quizStatus })
    })

    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}