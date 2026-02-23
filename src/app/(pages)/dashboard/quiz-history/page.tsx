import { fetchUserQuizHistory } from "@/app/_lib/quizes";
import { fetchCurrentUser } from "@/app/_lib/users";
import { poppins } from "@/app/_components/ui/font";
import Quizes from "@/app/_components/quiz/quizes";
import { QuizesSkeleton } from "@/app/_components/skeleton/quizes-skeleton";
import { Suspense } from "react";

export default async function QuizHistory({ searchParams }: { searchParams: { query?: string, page?: number } }) {
  const params = await searchParams;
  const currentPage = params.page || 1;

  const user = await fetchCurrentUser();
  const quizes = fetchUserQuizHistory(user._id, currentPage);

  return (
    <div className={`${poppins.className} flex flex-col gap-4`}>
      <h1 className="text-[var(--theme-blue)] font-bold text-base md:text-2xl">Quiz History</h1>
      <Suspense fallback={<QuizesSkeleton />}>
        <Quizes quizesPromise={quizes} noDataText="No quiz history found." />
      </Suspense>
    </div>
  );
}