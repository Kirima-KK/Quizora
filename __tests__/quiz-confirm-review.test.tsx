import { QuizConfirmReviewPanel } from "@/app/_components/quiz/quiz-confirm-review";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { redirect } from "next/navigation";

// Mocks
jest.mock("@/app/assets/icons/passed-icon.svg", () => ({
  __esModule: true,
  default: (props: any) => <img data-testid="passed-icon" {...props} />
}));

jest.mock("@/app/assets/icons/retry-icon.svg", () => ({
  __esModule: true,
  default: (props: any) => <img data-testid="retry-icon" {...props} />
}));

jest.mock("next/navigation", () => ({
  __esModule: true,
  redirect: jest.fn(),
}));

describe("Quiz Confirm Review", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it("render passed title", () => {
    render(<QuizConfirmReviewPanel
      score={7}
      isPassed={true}
      onReview={jest.fn()}
    />);

    const passedTitle = screen.getByText("Congratulations you have passed");

    expect(passedTitle).toBeInTheDocument();
  });

  it("render failed title", () => {
    render(<QuizConfirmReviewPanel
      score={5}
      isPassed={false}
      onReview={jest.fn()}
    />);

    const failedTitle = screen.queryByText("Almost there! Try again!");

    expect(failedTitle).toBeInTheDocument();
  });

  it("render score text", () => {
    render(<QuizConfirmReviewPanel
      score={5}
      isPassed={false}
      onReview={jest.fn()}
    />);

    const scoreText = screen.getByText((text) => text.includes("50%"));
    expect(scoreText).toBeInTheDocument();
  });

  it("render buttons", () => {
    render(<QuizConfirmReviewPanel
      score={5}
      isPassed={false}
      onReview={jest.fn()}
    />);

    const reviewButton = screen.getByRole("button", { name: /review/i });
    const homeButton = screen.getByRole("button", { name: /home/i });

    expect(reviewButton).toBeInTheDocument();
    expect(homeButton).toBeInTheDocument();
  });

  it("go to dashboard when click go home button", () => {
    render(<QuizConfirmReviewPanel
      score={5}
      isPassed={false}
      onReview={jest.fn()}
    />);

    const homeButton = screen.getByRole("button", { name: /home/i });
    fireEvent.click(homeButton);

    expect(redirect).toHaveBeenCalledWith("/dashboard");
  });

  it("show review panel when click review button", () => {
    const onReview = jest.fn()

    render(<QuizConfirmReviewPanel
      score={5}
      isPassed={false}
      onReview={onReview}
    />);

    const reviewButton = screen.getByRole("button", { name: /review/i });
    fireEvent.click(reviewButton);

    expect(onReview).toHaveBeenCalledTimes(1);
  });
});