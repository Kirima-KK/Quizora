import { QuizConfirmPanel } from "@/app/_components/quiz/quiz-confirm-panel";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

// Mock icon
jest.mock("@/app/assets/icons/question-mark-white.svg", () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />
}));

describe("Quiz Confirm Panel", () => {
  const setup = () => {
    render(
      <QuizConfirmPanel
        isLoading={false}
        onConfirm={jest.fn()}
        onClose={jest.fn()}
      />);
  };

  it("render buttons", () => {
    setup();

    const noButton = screen.getByRole("button", { name: /no/i });
    const yesButton = screen.getByRole("button", { name: /yes/i });

    expect(noButton).toBeInTheDocument();
    expect(yesButton).toBeInTheDocument();
  });

  it("return to Quiz Panel when cancel", async () => {
    const onClose = jest.fn();

    render(
      <QuizConfirmPanel
        isLoading={false}
        onConfirm={jest.fn()}
        onClose={onClose}
      />
    );

    const noButton = screen.getByRole("button", { name: /no/i });
    fireEvent.click(noButton);

    await waitFor(() => {
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  it("submit quiz result when confirm", async () => {
    const onConfirm = jest.fn();

    render(
      <QuizConfirmPanel
        isLoading={false}
        onConfirm={onConfirm}
        onClose={jest.fn()}
      />
    );

    const noButton = screen.getByRole("button", { name: /yes/i });
    fireEvent.click(noButton);

    expect(onConfirm).toHaveBeenCalledTimes(1);
  });
});