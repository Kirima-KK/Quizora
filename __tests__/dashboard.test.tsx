import Page from "@/app/(pages)/dashboard/(overview)/page";
import RootLayout from "@/app/(pages)/dashboard/layout";
import Layout from "@/app/(pages)/dashboard/layout";
import { ProfileInfo, QuizCollection } from "@/app/_lib/definition";
import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";

// Mock Profile
jest.mock('@/app/ui/dashboard/profile', () => ({
  __esModule: true,
  default: () => <div data-testid='profile'>Profile</div>
}));

// Mock Quizes
jest.mock('@/app/ui/quiz/quizes', () => ({
  __esModule: true,
  default: ({ quizesPromise, noDataText }: { quizesPromise: Promise<QuizCollection>, noDataText: string }) => (
    <div data-testid="quizes">Mock Quizes</div>
  ),
}))

jest.mock('@/app/lib/quizes', () => ({
  fetchQuizes: jest.fn(() => Promise.resolve({
    firstName: "Luna",
    lastName: "Duck",
    image: "/avatar.png",
  })),
}));

// Mock Avatar
jest.mock('@/app/ui/dashboard/avatar', () => ({
  __esModule: true,
  default: ({ user }: { user: ProfileInfo }) => <div data-testid='avatar'>Avatar</div>
}))

// Mock Search bar
jest.mock('@/app/ui/search-bar', () => ({
  __esModule: true,
  default: () => <div data-testid='search-bar'>Search Bar</div>
}))

// Mock Side nav
jest.mock('@/app/ui/dashboard/sidenav', () => ({
  __esModule: true,
  default: () => <div data-testid='sidenav'>Side Nav</div>
}))

// Mock Breadcrumb
jest.mock("@/app/ui/breadcrumb", () => ({
  __esModule: true,
  Breadcrumb: () => <div data-testid="breadcrumb">Breadcrumb</div>,
}));

// Mock user data
jest.mock("@/app/lib/users", () => ({
  fetchCurrentUser: jest.fn(() =>
    Promise.resolve({
      firstName: "Luna",
      lastName: "Duck",
      image: "/avatar.png",
    })
  ),
}));

describe("Dashboard Page", () => {
  it("renders dashboard page & layout", async () => {
    const page = await Page({ searchParams: {} });
    const layout = await RootLayout({
      children: page
    });

    render(layout);

    expect(await screen.findByTestId("profile")).toBeInTheDocument();
    expect(await screen.findByTestId("quizes")).toBeInTheDocument();
    expect(await screen.findByTestId("avatar")).toBeInTheDocument();
    expect(await screen.findByTestId("search-bar")).toBeInTheDocument();
    expect(await screen.findByTestId("sidenav")).toBeInTheDocument();
    expect(await screen.findByTestId("breadcrumb")).toBeInTheDocument();
  });
});