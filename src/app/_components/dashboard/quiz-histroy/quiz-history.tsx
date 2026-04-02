'use client';

import { fetchUserQuizHistory } from "@/app/_lib/quizes";
import { fetchCurrentUser } from "@/app/_lib/users";
import { poppins } from "@/app/_components/ui/font";
import Quizes from "@/app/_components/quiz/quizes";
import { Suspense, useEffect, useState } from "react";
import AuthGuard from "@/app/_components/auth-guard";
import { QuizCollection } from "@/app/_lib/definition";
import { QuizesSkeleton } from "@/app/_components/skeleton/quizes-skeleton";
import { useSearchParams } from "next/navigation";

export default function QuizHistory() {
  const [quizesHistory, setQuizesHistory] = useState<QuizCollection>();
  const [loading, setLoading] = useState(true);

  const params = useSearchParams();
  const currentPage = Number(params.get('page')) || 1;

  useEffect(() => {
    async function loadQuizHistoryData() {
      try {
        setLoading(true);

        // Fetch the user data
        const user = await fetchCurrentUser();

        // Fetch the user's quizes history
        if (user?._id) {
          const history = await fetchUserQuizHistory(user._id, currentPage);
          setQuizesHistory(history);
        }
      } catch (error) {
        console.error("Failed to load quiz history data:", error);
      } finally {
        setLoading(false);
      }
    }

    loadQuizHistoryData();
  }, [currentPage]);

  return (
    <AuthGuard>
      <div className={`${poppins.className} flex flex-col gap-4`}>
        <h1 className="text-[var(--theme-blue)] font-bold text-base md:text-2xl">Quiz History</h1>
        {loading || !quizesHistory ? <QuizesSkeleton /> : <Quizes quizesData={quizesHistory} noDataText="No quiz history found." />}
      </div>
    </AuthGuard>
  );
}