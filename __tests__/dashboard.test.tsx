import Page from "@/app/(pages)/dashboard/(overview)/page";
import RootLayout from "@/app/(pages)/dashboard/layout";
import { ProfileInfo, QuizCollection } from "@/app/_lib/definition";
import { fetchQuizes } from "@/app/_lib/quizes";
import { fetchCurrentUser } from "@/app/_lib/users";
import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import { Suspense } from "react";

// Mock Profile
jest.mock('@/app/_components/dashboard/profile/profile.tsx', () => ({
  __esModule: true,
  default: () => <div data-testid='profile'>Profile</div>
}));

// Mock skeleton
jest.mock("@/app/_components/skeleton/profile-skeleton", () => ({
  __esModule: true,
  default: () => <div data-testid="skeleton" />
}));

// Mock skeleton
jest.mock("@/app/_components/skeleton/quizes-skeleton", () => ({
  __esModule: true,
  QuizesSkeleton: () => <div data-testid="skeleton" />
}));

// Mock AuthGuard
jest.mock("@/app/_components/auth-guard", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Mock Quizes
jest.mock('@/app/_components/quiz/quizes.tsx', () => ({
  __esModule: true,
  default: ({ quizesData, noDataText }: { quizesData: QuizCollection, noDataText: string }) => (
    <div data-testid="quizes">Mock Quizes</div>
  ),
}))

jest.mock('@/app/_lib/quizes.ts', () => ({
  fetchQuizes: jest.fn(() => Promise.resolve([])),
}));

// Mock Avatar
jest.mock('@/app/_components/dashboard/profile/avatar.tsx', () => ({
  __esModule: true,
  default: () => <div data-testid='avatar'>Avatar</div>
}))

// Mock Search bar
jest.mock('@/app/_components/search-bar.tsx', () => ({
  __esModule: true,
  default: () => <div data-testid='search-bar'>Search Bar</div>
}))

// Mock Side nav
jest.mock('@/app/_components/dashboard/sidenav/sidenav.tsx', () => ({
  __esModule: true,
  default: () => <div data-testid='sidenav'>Side Nav</div>
}))

// Mock Breadcrumb
jest.mock("@/app/_components/breadcrumb.tsx", () => ({
  __esModule: true,
  Breadcrumb: () => <div data-testid="breadcrumb">Breadcrumb</div>,
}));

// Mock user data
jest.mock("@/app/_lib/users", () => ({
  fetchCurrentUser: jest.fn(),
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

describe("Dashboard Page", () => {
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
  });

  it("renders dashboard page & layout", async () => {
    render(
      <RootLayout>
        <Suspense fallback={<div>Loading...</div>}>
          <Page />
        </Suspense>
      </RootLayout>
    );

    expect(await screen.findByTestId("profile")).toBeInTheDocument();
    // expect(await screen.findByTestId("quizes")).toBeInTheDocument();
    expect(await screen.findByTestId("avatar")).toBeInTheDocument();
    expect(await screen.findByTestId("search-bar")).toBeInTheDocument();
    expect(await screen.findByTestId("sidenav")).toBeInTheDocument();
    expect(await screen.findByTestId("breadcrumb")).toBeInTheDocument();
  });
});