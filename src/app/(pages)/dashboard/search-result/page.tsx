import { fetchQuizByQuery } from "@/app/_lib/quizes";
import { poppins } from "@/app/_components/ui/font";
import Quizes from "@/app/_components/quiz/quizes";
import { QuizesSkeleton } from "@/app/_components/skeleton/quizes-skeleton";
import { Suspense } from "react";

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const quizes = fetchQuizByQuery(query);

  return (
    <div className={`${poppins.className} flex flex-col gap-4`}>
      <h1 className="text-[var(--theme-blue)] font-bold text-base md:text-2xl">Search Result of <span className="font-medium text-[var(--theme-grey)]">"{query}"</span></h1>
      <Suspense fallback={<QuizesSkeleton />}>
        <Quizes quizesPromise={quizes} noDataText={`No result for "${query}"`} />
      </Suspense>
    </div>
  );
}