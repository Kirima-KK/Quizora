'use client';

import { fetchQuizById, fetchQuizHistoryByQuizId } from "@/app/_lib/quizes";
import { fetchCurrentUser } from "@/app/_lib/users";
import { Quiz } from "@/app/_components/quiz/quiz-game";
import QuizInfoSkeleton from "@/app/_components/skeleton/quiz-info-skeleton";
import { useEffect, useState } from "react";
import { ProfileInfo, QuizHistoryItem, QuizInfo } from "@/app/_lib/definition";
import AuthGuard from "@/app/_components/auth-guard";

export default function Pages({ params }: { params: Promise<{ id: string }> }) {
  const [user, setUser] = useState<ProfileInfo>();
  const [quiz, setQuiz] = useState<QuizInfo>();
  const [quizHistory, setQuizHistory] = useState<QuizHistoryItem[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadQuizPage() {
      try {
        setLoading(true);
        // Get id from params
        const param = await params;

        // Fetch current user info
        const user = await fetchCurrentUser();
        setUser(user);

        // Fetch quiz data
        const id = param?.id;
        const quiz = await fetchQuizById(id);
        setQuiz(quiz);

        // Fetch quiz history
        let quizHistory = await fetchQuizHistoryByQuizId(user._id, id)
        setQuizHistory(quizHistory);
      } catch (error) {
        console.error("Failed to load quiz data:", error);
      } finally {
        setLoading(false);
      }
    }

    loadQuizPage();
  }, []);

  if (loading || !user || !quiz || !quizHistory) return <QuizInfoSkeleton />;

  return (
    <AuthGuard>
      <div>
        <Quiz
          user={user}
          quiz={quiz}
          quizHistory={quizHistory}
        />
      </div>
    </AuthGuard>
  );
}