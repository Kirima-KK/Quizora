import QuestionMark from "@/app/_assets/icons/question-mark-white.svg";
import { Spinner } from "@heroui/react";

export function QuizConfirmPanel({
  isLoading,
  onConfirm,
  onClose
}: {
  isLoading: boolean,
  onConfirm: () => void,
  onClose: () => void
}) {
  return (
    <>
      <div className="bg-white rounded-4xl p-10 md:w-119 max-w-2xl md:h-109 shadow-lg relative flex flex-col items-center justify-center gap-9">
        <span className="flex items-center justify-center shadow-lg relative bg-[var(--theme-blue)] rounded-full w-29 h-29 block">
          <QuestionMark className="w-7 h-9" />
        </span>
        <h2 className="text-base w-60 text-center">Are you Sure you want to submit Quiz?</h2>
        <div className="flex flex-row gap-36">
          <button
            className="px-6 py-2 h-16 w-full md:w-24 text-[var(--theme-blue)] text-xl font-semibold rounded-lg border border-s border-[var(--theme-blue)]
            hover:bg-[var(--theme-blue)] hover:text-white"
            onClick={onClose}
          >
            No
          </button>

          <button
            className="px-6 py-2 h-16 w-full md:w-24 bg-[var(--theme-blue)] text-white text-xl font-semibold rounded-lg
            hover:bg-white hover:text-[var(--theme-blue)] hover:border hover:border-[var(--theme-blue)]"
            onClick={onConfirm}
          >
            {isLoading ? <Spinner size="lg" className="text-white" /> : "Yes"}
          </button>
        </div>
      </div>
    </>
  );
}