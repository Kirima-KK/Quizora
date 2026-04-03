'use client';

import { fetchQuizByQuery } from "@/app/_lib/quizes";
import { poppins } from "@/app/_components/ui/font";
import Quizes from "@/app/_components/quiz/quizes";
import { Suspense, useEffect, useState } from "react";
import { QuizCollection } from "@/app/_lib/definition";
import AuthGuard from "@/app/_components/auth-guard";
import { useSearchParams } from "next/navigation";
import { QuizesSkeleton } from "@/app/_components/skeleton/quizes-skeleton";

function SearchResultContent() {
  const params = useSearchParams();
  const query = params.get('query') || '';
  const [quizes, setQuizes] = useState<QuizCollection>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSearchResultData() {
      try {
        setLoading(true);

        // Fetch the quizes data
        const quizes = await fetchQuizByQuery(query);
        setQuizes(quizes);
      } catch (error) {
        console.error("Failed to load search result data:", error);
      } finally {
        setLoading(false);
      }
    }

    loadSearchResultData();
  }, []);

  return (
    <div className={`${poppins.className} flex flex-col gap-4`}>
      <h1 className="text-[var(--theme-blue)] font-bold text-base md:text-2xl">Search Result of <span className="font-medium text-[var(--theme-grey)]">"{query}"</span></h1>
      {loading ? <QuizesSkeleton /> : <Quizes quizesData={quizes} noDataText={`No result for "${query}"`} />}
    </div>
  );
}

export default function SearchResult() {
  return (
    <AuthGuard>
      <Suspense fallback={<QuizesSkeleton />}>
        <SearchResultContent />
      </Suspense>
    </AuthGuard>
  );
}