import QuizPassedIcon from "@/app/_assets/icons/passed-icon.svg";
import QuizRetryIcon from "@/app/_assets/icons/retry-icon.svg";
import { poppins } from "../ui/font";
import { redirect } from "next/navigation";

export function QuizConfirmReviewPanel({
  score,
  isPassed,
  onReview,
}: {
  score: number,
  isPassed: boolean,
  onReview: () => void,
}) {
  const onBack = () => {
    redirect('/dashboard');
  }

  return (
    <div className={`${poppins.className} bg-white rounded-4xl p-10 scale-90 md:scale-100 md:w-119 max-w-2xl md:h-109 shadow-lg relative flex flex-col items-center justify-center gap-9`}>
      <h1>{isPassed ? <QuizPassedIcon className="w-25 h-25" /> : <QuizRetryIcon className="w-25 h-25" />}</h1>
      <h1 className="font-bold text-xl">{isPassed ? "Congratulations you have passed" : "Almost there! Try again!"}</h1>
      <p className="text-base">You scored {score * 10}%</p>
      <div className="flex flex-row gap-8">
        <button
          className="px-8 py-5 text-[var(--theme-blue)] text-base md:text-xl font-semibold rounded-lg border border-s border-[var(--theme-blue)]
          hover:bg-[var(--theme-blue)] hover:text-white"
          onClick={onReview}
        >
          Review Quiz
        </button>

        <button
          className="px-8 py-5 bg-[var(--theme-blue)] text-white text-base md:text-xl font-semibold rounded-lg border border-[var(--theme-blue)]
          hover:bg-white hover:text-[var(--theme-blue)] hover:border hover:border-[var(--theme-blue)]"
          onClick={onBack}
        >
          Go Home
        </button>
      </div>
    </div>
  );
}