'use client';

import { ProfileInfo, Question, QuizHistoryItem, QuizInfo } from "@/app/_lib/definition";
import Image from 'next/image';
import { QuizPanel } from "./quiz-panel";
import { useState } from "react";
import { poppins } from "../ui/font";
import { isoToDateFormat } from "@/app/_lib/utils";
import { useRouter } from "next/navigation";

export function Quiz({
  user,
  quiz,
  quizHistory
}: {
  user: ProfileInfo
  quiz: QuizInfo,
  quizHistory: QuizHistoryItem[],
}) {
  const [showPanel, setShowPanel] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);

  const router = useRouter();

  let latestDate = () => {
    const allSubmittedDate = quizHistory.map((quiz: QuizHistoryItem) => quiz.submittedDate);
    const date = new Date(
      Math.max(...allSubmittedDate.map((d: string) => new Date(d).getTime()))
    ).toString();
    return allSubmittedDate.length === 0 ? "-" : isoToDateFormat(date);
  };

  let highscore = () => {
    const allHighScore = quizHistory.map((quiz: QuizHistoryItem) => quiz.score);
    return allHighScore.length === 0 ? "-" : Math.max(...allHighScore) * 10;
  };

  return (
    <div className={`${poppins.className} flex flex-col md:flex-row gap-8`}>
      <div className="flex flex-col gap-8 w-full md:w-2/3">
        <h1 className="text-[var(--theme-blue)] font-bold text-base md:text-2xl">{quiz.name}</h1>
        <div className="flex flex-col gap-8 md:ml-30">
          <Image
            src={quiz.image ?? null}
            width={903}
            height={487}
            alt="Quiz Image"
            className="w-full h-64 md:h-120 object-cover rounded-lg"
          />
          <p className="text-base text-center md:text-left">{quiz.description}</p>
        </div>
      </div>

      <div className="flex flex-col gap-12 text-left w-full md:w-1/3 md:items-center md:justify-center">
        <div className="flex gap-8 text-left text-[var(--theme-grey)]">
          <div className="flex flex-col gap-16 font-bold text-sm md:text-xl">
            <p>Submitted Date:</p>
            <p>Your Highscore:</p>
            <p>Pass Points:</p>
          </div>
          <div className="flex flex-col gap-16 text-sm md:text-xl">
            <p>{latestDate()}</p>
            <p>{highscore()}</p>
            <p>{quiz.passPoint * 10} </p>
          </div>
        </div>
        <button
          className={`w-full h-16 md:w-52 rounded-xl bg-[var(--theme-blue)] text-white hover:bg-white hover:text-[var(--theme-blue)] hover:border hover:border-[var(--theme-blue)]`}
          onClick={() => {
            setShowPanel(true);
            setQuestions(quiz.questions);
          }}
        >
          Start
        </button>
        {showPanel &&
          <QuizPanel
            user={user}
            questions={questions}
            passPoints={quiz.passPoint}
            onClose={() => {
              setShowPanel(false)
              router.refresh();
            }}
          />
        }
      </div>
    </div>
  );
}