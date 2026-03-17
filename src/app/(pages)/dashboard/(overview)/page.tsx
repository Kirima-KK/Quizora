import { fetchQuizes } from "@/app/_lib/quizes";
import Profile from "@/app/_components/dashboard/profile/profile";
import { poppins } from "@/app/_components/ui/font";
import Quizes from "@/app/_components/quiz/quizes";
import ProfileSkeleton from "@/app/_components/skeleton/profile-skeleton";
import { QuizesSkeleton } from "@/app/_components/skeleton/quizes-skeleton";
import { Suspense } from "react";

export default async function Page({ searchParams }: { searchParams: { query?: string, page?: number } }) {
  const params = await searchParams;
  const currentPage = params.page || 1;
  const quizes = fetchQuizes(currentPage);

  return (
    <div>
      <main className="flex flex-col gap-12">
        <Suspense fallback={<ProfileSkeleton />}>
          <Profile />
        </Suspense>

        <div className="flex flex-col gap-4">
          <h1 className={`${poppins.className} text-[var(--theme-blue)] font-bold text-base md:text-2xl`}>Featured Quizes</h1>
          <Suspense fallback={<QuizesSkeleton />}>
            <Quizes quizesPromise={quizes} noDataText="No quiz found." />
          </Suspense>
        </div>
      </main>
    </div>
  );
}