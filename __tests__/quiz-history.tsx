import { QuizCollection } from '@/app/_lib/definition';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import QuizHistory from '@/app/(pages)/dashboard/quiz-history/page';

// Mock Quizes
jest.mock('@/app/ui/quiz/quizes', () => ({
  __esModule: true,
  default: ({ quizesPromise, noDataText }: { quizesPromise: Promise<QuizCollection>, noDataText: string }) => (
    <div data-testid="quizes">Mock Quizes</div>
  ),
}))

jest.mock('@/app/lib/quizes', () => ({
  fetchQuizes: jest.fn(() => Promise.resolve([])),
}));

// Mock datas
jest.mock('@/app/lib/quizes', () => ({
  __esModule: true,
  fetchUserQuizHistory: jest.fn(() => Promise.resolve([])),
}));

jest.mock('@/app/lib/users', () => ({
  __esModule: true,
  fetchCurrentUser: jest.fn(() => Promise.resolve([])),
}));

describe("Quiz History Page", () => {
  it("renders quizes", async () => {
    const quizHistory = await QuizHistory({ searchParams: {} });
    render(quizHistory);

    const quizes = screen.getByTestId('quizes');
    expect(quizes).toBeInTheDocument();
  });
});