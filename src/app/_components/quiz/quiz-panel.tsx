import { Choice, ChoiceStatus, ProfileInfo, Question, QuizHistoryItem, UserQuizAnswer } from "@/app/_lib/definition";
import { useState } from "react";
import { QuizConfirmPanel } from "@/app/_components/quiz/quiz-confirm-panel";
import { useParams, usePathname, useRouter } from "next/navigation";
import { QuizConfirmReviewPanel } from "./quiz-confirm-review";
import clsx from "clsx";
import { poppins } from "../ui/font";
import { XMarkIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useQuizSubmit } from "@/app/_hooks/useSubmit";

// Define Panel States
const PanelState = {
  Quiz: 'quiz',
  Confirm: 'confirm',
  ConfirmReview: 'confirmReview',
  Review: 'review'
}

type PanelState = typeof PanelState[keyof typeof PanelState];

export function QuizPanel({
  user,
  questions,
  passPoints,
  onClose
}: {
  user: ProfileInfo,
  questions: Question[],
  passPoints: number,
  onClose: () => void
}) {
  const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
  const [answers, setAnswers] = useState<UserQuizAnswer[]>([]);
  const [panelState, setPanelState] = useState(PanelState.Quiz);

  const { isLoading, response, submit } = useQuizSubmit();

  const isLastQuestion = currentQuestion.id === questions.length;

  const nextQuestion = () => {
    if (currentQuestion.id === questions.length) {
      return;
    }

    let nextId = currentQuestion.id + 1;
    let nextQuestion = questions.find(question => question.id == nextId);
    if (!nextQuestion) {
      console.error(`question not found! ${currentQuestion.id}`);
      return;
    }

    setCurrentQuestion(nextQuestion);
  }

  const onAnswer = (choiceId: number) => {
    const answerId = answers.map(answer => answer.id);
    if (answerId.includes(currentQuestion.id)) {
      setAnswers(prev => prev.map(item =>
        item.id === currentQuestion.id ?
          { ...item, choice: choiceId, isCorrect: currentQuestion.answer === choiceId } :
          item
      ));

    } else {
      setAnswers(prev => [...prev, { id: currentQuestion.id, choice: choiceId, isCorrect: currentQuestion.answer === choiceId }]);
    }
  }

  const onBack = () => {
    if (currentQuestion.id === 1) {
      return;
    }

    let prevId = currentQuestion.id - 1;
    let prevQuestion = questions.find(question => question.id == prevId);

    if (!prevQuestion) {
      console.error(`question not found! ${currentQuestion.id}`);
      return;
    }

    setCurrentQuestion(prevQuestion);
  };

  const onSubmit = async () => {
    setPanelState(PanelState.Confirm);
  }

  const onConfirm = async () => {
    submit(quizResult);
    setCurrentQuestion(questions[0]);
    setPanelState(PanelState.ConfirmReview);
  }

  const totalScore = answers.reduce((acc, answer) => {
    return answer.isCorrect ? (acc + 1) : acc;
  }, 0);

  const { id } = useParams() as { id: string };

  const quizResult: QuizHistoryItem = {
    quizId: id,
    userId: user!._id,
    answers: answers,
    submittedDate: new Date().toLocaleDateString(),
    score: totalScore,
    quizStatus: totalScore >= passPoints
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      {panelState == PanelState.Quiz &&
        <QuestionDetails
          currentQuestion={currentQuestion}
          isLastQuestion={isLastQuestion}
          status={{ isReview: false, answers: answers }}
          onClose={onClose}
          onBack={onBack}
          onAnswer={onAnswer}
          onSubmit={onSubmit}
          nextQuestion={nextQuestion}
        />
      }

      {panelState === PanelState.Confirm &&
        <QuizConfirmPanel isLoading={isLoading} onConfirm={onConfirm} onClose={() => setPanelState(PanelState.Quiz)} />
      }

      {panelState === PanelState.ConfirmReview &&
        <QuizConfirmReviewPanel
          score={quizResult.score}
          isPassed={quizResult.quizStatus}
          onReview={() => setPanelState(PanelState.Review)}
        />
      }

      {panelState == PanelState.Review &&
        <QuestionDetails
          currentQuestion={currentQuestion}
          isLastQuestion={isLastQuestion}
          status={{ isReview: true, answers: answers }}
          onClose={onClose}
          onBack={onBack}
          nextQuestion={nextQuestion}
        />
      }

    </div>
  );
}

function QuestionDetails({
  currentQuestion,
  isLastQuestion,
  status,
  onClose,
  onBack,
  onAnswer,
  onSubmit,
  nextQuestion
}: {
  currentQuestion: Question,
  isLastQuestion: boolean,
  status: { isReview: boolean, answers: UserQuizAnswer[] },
  onClose: () => void,
  onBack: () => void,
  onAnswer?: (id: number) => void,
  onSubmit?: () => void,
  nextQuestion: () => void
}) {
  return (
    <div aria-label="quiz-panel" className={`${poppins.className} text-[#4A4A4A] flex flex-col gap-5 bg-white md:rounded-3xl p-10 w-full max-w-2xl h-screen md:h-fit shadow-lg relative`}>
      <div className="flex flex-col items-center justify-center gap-5">
        <button
          className="flex items-center justify-center absolute top-4 right-4 md:-top-4 md:-right-4 bg-[#FBF9F9] w-10 h-10 rounded-full border border-[var(--theme-grey)]
          hover:scale-110 transition-transform duration-200 hover:bg-[var(--theme-blue)] hover:text-white"
          onClick={onClose}
          aria-label="close button"
        >
          <XMarkIcon className="w-8 h-8 md:w-4 md:h-4" />
        </button>

        {
          currentQuestion.id !== 1 &&
          (
            <button
              className="flex items-center absolute top-4 left-4 md:top-8 md:left-10 justify-center bg-[#FBF9F9] w-10 h-10 rounded-full border border-[var(--theme-grey)]
              hover:scale-110 transition-transform duration-200 hover:bg-[var(--theme-blue)] hover:text-white"
              onClick={onBack}
              aria-label="back button"
            >
              <ChevronLeftIcon className="w-8 h-8 md:w-4 md:h-4" />
            </button>
          )
        }

        <div className="flex flex-col items-center justify-center">
          <h1 className="font-semibold text-2xl">Question {currentQuestion.id}</h1><br />
          <p className="text-base">{currentQuestion.question}</p>
        </div>
        {
          currentQuestion.choices.map((choice) => (
            <Choices
              key={choice.id}
              choice={choice}
              status={{
                isReview: status.isReview,
                isCorrect: choice.id === currentQuestion.answer,
                isUserAnswer: status.answers.find(answer => answer.id === currentQuestion.id)?.choice === choice.id
              }}
              onChoiceClick={() => { if (onAnswer) onAnswer(choice.id) }}
            />
          ))
        }
      </div>

      <div className="flex justify-end">
        {
          isLastQuestion && !status.isReview && (
            <button
              className="px-6 py-2 h-16 w-full md:w-33 bg-[var(--theme-blue)] text-white text-xl font-normal rounded-lg
              hover:bg-white hover:text-[var(--theme-blue)] hover:border hover:border-[var(--theme-blue)]"
              onClick={() => { if (onSubmit) onSubmit() }}
            >
              Submit
            </button>
          )
        }

        {
          !isLastQuestion && (
            <button
              className="px-6 py-2 h-16 w-full md:w-33 bg-[var(--theme-blue)] text-white text-xl font-normal rounded-lg
              hover:bg-white hover:text-[var(--theme-blue)] hover:border hover:border-[var(--theme-blue)]"
              onClick={nextQuestion}
            >
              Next
            </button>
          )
        }
      </div>
    </div>
  );
}

function Choices({ choice, status, onChoiceClick }: { choice: Choice, status: ChoiceStatus, onChoiceClick: () => void }) {
  return (
    <button
      className={clsx("flex items-center w-full border border-solid border-[0.5px] p-8 h-20 bg-[#FBF9F9] rounded-xl text-base hover:bg-[var(--theme-blue)] hover:text-white", {
        "border-green-500 text-green-500": status.isReview && status.isCorrect,
        "border-red-500 text-red-500": status.isReview && !status.isCorrect && status.isUserAnswer,
        "border-[var(--theme-blue)]": !status.isReview,
        "bg-[var(--theme-blue)] text-white": !status.isReview && status.isUserAnswer,
      })}
      onClick={onChoiceClick}
    >
      {choice.choice}
    </button>
  );
}