'use client';

import { fetchUserQuizHistory } from "@/app/_lib/quizes";
import { fetchCurrentUser } from "@/app/_lib/users";
import { poppins } from "@/app/_components/ui/font";
import Quizes from "@/app/_components/quiz/quizes";
import { QuizesSkeleton } from "@/app/_components/skeleton/quizes-skeleton";
import { Suspense, useEffect, useState } from "react";
import AuthGuard from "@/app/_components/auth-guard";
import { ProfileInfo, QuizCollection } from "@/app/_lib/definition";

export default function QuizHistory({ searchParams }: { searchParams: { query?: string, page?: number } }) {
  const [params, setParams] = useState<{ query?: string, page?: number }>();
  const currentPage = params?.page || 1;

  const [user, setUser] = useState<ProfileInfo>();
  const [quizesHistory, setQuizesHistory] = useState<QuizCollection>();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadQuizHistoryData() {
      try {
        setLoading(true);

        // Get the params
        const params = await searchParams;
        setParams(params);

        // Fetch the user data
        const user = await fetchCurrentUser();
        setUser(user);

        // Fetch the user's quizes history
        const quizesHistory = await fetchUserQuizHistory(user._id, currentPage);
        setQuizesHistory(quizesHistory);
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }

    loadQuizHistoryData();
  }, []);

  return (
    <AuthGuard>
      <div className={`${poppins.className} flex flex-col gap-4`}>
        <h1 className="text-[var(--theme-blue)] font-bold text-base md:text-2xl">Quiz History</h1>
          <Quizes quizesData={quizesHistory} noDataText="No quiz history found." />
      </div>
    </AuthGuard>
  );
}