import { QuizCollection } from '@/app/_lib/definition';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import QuizHistory from '@/app/(pages)/dashboard/quiz-history/page';
import { fetchCurrentUser } from '@/app/_lib/users';
import { fetchQuizes, fetchUserQuizHistory } from '@/app/_lib/quizes';
import { Suspense } from 'react';

// Mock Quizes
jest.mock('@/app/_components/quiz/quizes', () => ({
  __esModule: true,
  default: ({ quizesData, noDataText }: { quizesData: QuizCollection, noDataText: string }) => (
    <div data-testid="quizes">Mock Quizes</div>
  ),
}))

jest.mock('@/app/_lib/quizes', () => ({
  fetchQuizes: jest.fn(() => Promise.resolve([])),
  fetchUserQuizHistory: jest.fn(() => Promise.resolve([])),
}));

// Mock skeleton
jest.mock("@/app/_components/skeleton/quizes-skeleton", () => ({
  __esModule: true,
  QuizesSkeleton: () => <div data-testid="skeleton" />
}));

jest.mock('@/app/_lib/users', () => ({
  __esModule: true,
  fetchCurrentUser: jest.fn(() => Promise.resolve([])),
}));

// Mock useSearchParams
jest.mock('next/navigation', () => ({
  __esModule: true,
  useSearchParams: () => ({
    get: jest.fn((key: string) => {
      if (key === 'page') return '1';
      return null;
    }),
  }),
  usePathname: () => '/dashboard',
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

// Mock AuthGuard
jest.mock("@/app/_components/auth-guard", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe("Quiz History Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (fetchCurrentUser as jest.Mock).mockResolvedValue({
      _id: "123",
      name: "Test User",
      firstName: "Test",
      lastName: "User",
      image: "/avatar.png"
    });

    (fetchQuizes as jest.Mock).mockResolvedValue({
      quizes: [],
      totalPages: 2
    });

    (fetchUserQuizHistory as jest.Mock).mockResolvedValue({
      quizes: [],
      totalPages: 2
    });
  });
  it("renders quizes", async () => {
    render(
      <Suspense fallback={<div>Loading...</div>}>
        <QuizHistory />
      </Suspense>
    );

    const quizes = await screen.findByTestId('quizes');
    expect(quizes).toBeInTheDocument();
  });
});