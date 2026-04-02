import Profile from "@/app/_components/dashboard/profile/profile";
import { fetchCurrentUser } from "@/app/_lib/users";
import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";

// Mock fetchCurrentUser
jest.mock("@/app/_lib/users", () => ({
  fetchCurrentUser: jest.fn(),
}));

// Mock fetchUserQuizData
jest.mock("@/app/_lib/quizes", () => ({
  fetchUserQuizData: jest.fn(() => Promise.resolve({
    quizPassed: 3,
    correctAnswers: 30
  }))
}));

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />
}));

//Mock Icons
jest.mock("@/app/_assets/icons/akar-icons_circle-check-fill.svg", () => ({
  __esModule: true,
  default: (props: any) => <div data-testid='correct-icon' {...props} >CorrectIcon</div>
}));

jest.mock("@/app/_assets/icons/ant-design_flag-filled.svg", () => ({
  __esModule: true,
  default: (props: any) => <div data-testid='flag-icon' {...props} >FlagIcon</div>
}));

// Mock skeleton
jest.mock("@/app/_components/skeleton/profile-skeleton", () => ({
  __esModule: true,
  default: () => <div data-testid="skeleton" />
}));

describe("Profile Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (fetchCurrentUser as jest.Mock).mockResolvedValue({
      _id: "123",
      name: "Test User",
      firstName: "Test",
      lastName: "User",
      image: "/avatar.png"
    });
  });

  it("render user image", async () => {
    render(<Profile />);

    const userImage = await screen.findByAltText((text) => text.includes("profile"));
    expect(userImage).toBeInTheDocument();
  });

  it("render user name", async () => {
    render(<Profile />);

    const name = await screen.findByText((text) => text.includes("Test"));
    expect(name).toBeInTheDocument();
  });

  it("render quiz passed and correct answers", async () => {
    render(<Profile />);

    const quizPassed = await screen.findByText("3");
    const correctAnswers = await screen.findByText("30");
    expect(quizPassed).toBeInTheDocument();
    expect(correctAnswers).toBeInTheDocument();
  });
});