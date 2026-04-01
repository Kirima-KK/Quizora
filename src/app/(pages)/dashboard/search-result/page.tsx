'use client';

import { fetchQuizByQuery } from "@/app/_lib/quizes";
import { poppins } from "@/app/_components/ui/font";
import Quizes from "@/app/_components/quiz/quizes";
import { QuizesSkeleton } from "@/app/_components/skeleton/quizes-skeleton";
import { Suspense, useEffect, useState } from "react";
import { QuizCollection } from "@/app/_lib/definition";

export default function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const [params, setParams] = useState<{ query?: string, page?: string }>();
  const query = params?.query || '';
  const [quizes, setQuizes] = useState<QuizCollection>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSearchResultData() {
      try {
        setLoading(true);

        // Get the params
        const params = await props.searchParams;
        setParams(params);

        // Fetch the quizes data
        const quizes = await fetchQuizByQuery(query);
        setQuizes(quizes);
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }

    loadSearchResultData();
  }, []);
  return (
    <div className={`${poppins.className} flex flex-col gap-4`}>
      <h1 className="text-[var(--theme-blue)] font-bold text-base md:text-2xl">Search Result of <span className="font-medium text-[var(--theme-grey)]">"{query}"</span></h1>
      <Quizes quizesData={quizes} noDataText={`No result for "${query}"`} />
    </div>
  );
}