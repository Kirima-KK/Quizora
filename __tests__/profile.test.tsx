import Profile from "@/app/_components/dashboard/profile/profile";
import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";

// Mock fetchCurrentUser
jest.mock("@/app/lib/users", () => ({
  fetchCurrentUser: jest.fn(() => Promise.resolve({
    firstName: "Luna",
    lastName: "Duck",
  }))
}));

// Mock fetchUserQuizData
jest.mock("@/app/lib/quizes", () => ({
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
jest.mock("@/app/assets/icons/akar-icons_circle-check-fill.svg", () => ({
  __esModule: true,
  default: (props: any) => <div data-testid='correct-icon' {...props} >CorrectIcon</div>
}));

jest.mock("@/app/assets/icons/ant-design_flag-filled.svg", () => ({
  __esModule: true,
  default: (props: any) => <div data-testid='flag-icon' {...props} >FlagIcon</div>
}));

describe("Profile Component", () => {
  it("render user image", async () => {
    const ui = await Profile();
    render(ui);

    const userImage = screen.getByAltText((text) => text.includes("profile"));
    expect(userImage).toBeInTheDocument();
  });

  it("render user name", async () => {
    const ui = await Profile();
    render(ui);

    const name = screen.getByText((text) => text.includes("Luna"));
    expect(name).toBeInTheDocument();
  });

  it("render quiz passed and correct answers", async () => {
    const ui = await Profile();
    render(ui);

    const quizPassed = screen.getByText("3");
    const correctAnswers = screen.getByText("30");
    expect(quizPassed).toBeInTheDocument();
    expect(correctAnswers).toBeInTheDocument();
  });
});