import { fetchQuizById, fetchQuizHistoryByQuizId } from "@/app/_lib/quizes";
import { fetchCurrentUser } from "@/app/_lib/users";
import { Quiz } from "@/app/_components/quiz/quiz-game";
import QuizInfoSkeleton from "@/app/_components/skeleton/quiz-info-skeleton";
import { Suspense } from "react";

export default async function Pages({ params }: { params: Promise<{ id: string }> }) {
  const param = await params;
  const id = param.id;
  const user = fetchCurrentUser();

  let quiz = fetchQuizById(id);
  let quizHistory = user.then(user =>
    fetchQuizHistoryByQuizId(user._id, id)
  );

  return (
    <div>
      <Suspense fallback={<QuizInfoSkeleton />}>
        <Quiz
          userPromise={user}
          quizPromise={quiz}
          quizHistoryPromise={quizHistory}
        />
      </Suspense>
    </div>
  );
}