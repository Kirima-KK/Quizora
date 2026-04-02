'use client';

import { QuizCollection, QuizInfo } from "@/app/_lib/definition";
import { poppins } from "../ui/font";
import Image from "next/image";
import Link from "next/link";
import Pagination from "../pagination";

export default function Quizes({ quizesData, noDataText }: { quizesData: QuizCollection, noDataText: string }) {
  const totalPages = quizesData.totalPages;
  const quizes = quizesData.quizes;
  if (!quizes || quizes.length === 0) return <h1>{noDataText}</h1>

  return (
    <div className={`flex flex-col gap-6`}>
      <div className="flex flex-col grow w-64 md:w-380 md:grid md:grid-cols-3 gap-8 ">
        {
          quizes.map((quiz) => {
            return (
              <div key={quiz._id}>
                <QuizCard info={quiz} />
              </div>
            );
          })
        }
      </div>
      <div className="mt-5 flex w-full justify-center md:justify-end">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}

export function QuizCard({ info }: { info: QuizInfo }) {
  return (
    <Link href={`/quiz/${info._id}`}>
      <div className={`${poppins.className} text-white relative flex flex-1 flex-shrink-0 items-end justify-center hover:scale-95 transition-transform duration-200`}>
        <Image
          src={info.image}
          alt={info.description}
          width={508}
          height={346}
          className={`w-full h-64 md:h-80 rounded-lg object-cover`}
        />

        <p className="absolute md:-translate-y-1/2 backdrop-blur p-6 rounded-lg text-sm md:text-base m-4 md:m-0">{info.name}</p>
      </div>
    </Link>
  );
}