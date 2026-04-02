'use client';

import { Suspense } from "react";
import { QuizesSkeleton } from "@/app/_components/skeleton/quizes-skeleton";
import QuizHistory from "@/app/_components/dashboard/quiz-histroy/quiz-history";

export default function Page() {

  return (
    <Suspense fallback={<QuizesSkeleton />}>
      <QuizHistory />
    </Suspense>
  );
}