'use client';

import { fetchQuizes } from "@/app/_lib/quizes";
import Profile from "@/app/_components/dashboard/profile/profile";
import { poppins } from "@/app/_components/ui/font";
import Quizes from "@/app/_components/quiz/quizes";
import { Suspense, useEffect, useState } from "react";
import AuthGuard from "@/app/_components/auth-guard";
import { QuizCollection } from "@/app/_lib/definition";
import { QuizesSkeleton } from "@/app/_components/skeleton/quizes-skeleton";
import { useSearchParams } from "next/navigation";

function DashboardContent() {
  const [quizes, setQuizes] = useState<QuizCollection>();

  const params = useSearchParams();
  const currentPage = Number(params.get('page')) || 1;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isCurrent = true; // Prevents race conditions

    async function loadDashboardData() {
      try {
        setLoading(true);
        setQuizes(undefined);

        // Fetch the quizes data using the current page
        const quizes = await fetchQuizes(currentPage);
        if (isCurrent) setQuizes(quizes);
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      } finally {
        if (isCurrent) setLoading(false);
      }
    }

    loadDashboardData();

    return () => {
      isCurrent = false;
    };
  }, [currentPage]);

  return (
    <div>
      <main className="flex flex-col gap-12">
        <Profile />

        <div className="flex flex-col gap-4">
          <h1 className={`${poppins.className} text-[var(--theme-blue)] font-bold text-base md:text-2xl`}>Featured Quizes</h1>
          {loading ? <QuizesSkeleton /> : <Quizes quizesData={quizes} noDataText="No quiz found." />}
        </div>
      </main>
    </div>
  );
}

export default function Dashboard() {
  return (
    <AuthGuard>
      <Suspense>
        <DashboardContent />
      </Suspense>
    </AuthGuard>
  );
}