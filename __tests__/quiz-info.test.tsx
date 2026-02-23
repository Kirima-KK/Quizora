import { Quiz } from '@/app/_components/quiz/quiz-game';
import '@testing-library/jest-dom';
import { act, fireEvent, render, screen } from '@testing-library/react';

// Mock Router
jest.mock('next/navigation', () => ({
  __esModule: true,
  useRouter: () => ({ push: jest.fn() }),
}));

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />
}));

// Mock Quiz Panel
jest.mock("@/app/ui/quiz/quiz-panel", () => ({
  __esModule: true,
  QuizPanel: () => <div data-testid="quiz-panel">Quiz Panel</div>
}));


const userData = {
  _id: "test",
  firstName: "Luna",
  lastName: "Duck",
  image: "/avatar.png",
};

const quizData = {
  _id: "quiz-test",
  name: "Level Up: Gaming Challenge",
  description: "Dive into the world of video games and test your knowledge across multiple genres. From classic arcade hits to modern blockbusters, this quiz will challenge casual and hardcore gamers alike. Can you identify the characters, consoles, and iconic moments that shaped gaming history?",
  image: "https://images.pexels.com/photos/159393/gamepad-video-game-controller-game-controller-controller-159393.jpeg?_gl=1*10zsta7*_ga*NzA1NDM4Njk3LjE3NjM2OTY0MDU.*_ga_8JE65Q40S6*czE3NjM2OTY0MDUkbzEkZzEkdDE3NjM2OTY0NzAkajU2JGwwJGgw",
  passPoint: 6,
  questions: [{
    "id": 1,
    "question": "Which game features the character 'Master Chief'?",
    "choices": [
      {
        "id": 1,
        "choice": "Halo"
      },
      {
        "id": 2,
        "choice": "Call of Duty"
      },
      {
        "id": 3,
        "choice": "Gears of War"
      },
      {
        "id": 4,
        "choice": "Overwatch"
      }
    ],
    "answer": 1
  },
  {
    "id": 2,
    "question": "In Mario Kart, which item can throw a shell backwards?",
    "choices": [
      {
        "id": 1,
        "choice": "Banana"
      },
      {
        "id": 2,
        "choice": "Red Shell"
      },
      {
        "id": 3,
        "choice": "Green Shell"
      },
      {
        "id": 4,
        "choice": "Mushroom"
      }
    ],
    "answer": 2
  },
  {
    "id": 3,
    "question": "Which game popularized the 'Battle Royale' genre?",
    "choices": [
      {
        "id": 1,
        "choice": "Fortnite"
      },
      {
        "id": 2,
        "choice": "PUBG"
      },
      {
        "id": 3,
        "choice": "Apex Legends"
      },
      {
        "id": 4,
        "choice": "Call of Duty: Warzone"
      }
    ],
    "answer": 2
  }]
};

const quizHistoryData = [{

  quizId: "691ad7589b70a384b021e9a0",
  userId: "691c4d98eb1e84d50796f651",
  answers: [
    {
      id: 1,
      choice: 1,
      isCorrect: true
    },
    {
      id: 2,
      choice: 1,
      isCorrect: false
    },
    {
      id: 3,
      choice: 1,
      isCorrect: false
    },

  ],
  submittedDate: "2025-12-04",
  score: 5,
  quizStatus: false,
}];

describe("Quiz info", () => {
  it("renders quiz info", async () => {
    await act(async () => {
      render(<Quiz
        userPromise={Promise.resolve(userData)}
        quizPromise={Promise.resolve(quizData)}
        quizHistoryPromise={Promise.resolve(quizHistoryData)}
      />);
    });

    const title = await screen.findByText("Level Up: Gaming Challenge");
    expect(title).toBeInTheDocument();

    const quizImage = await screen.findByAltText((text) => text.toLowerCase().includes("quiz"));
    expect(quizImage).toBeInTheDocument();

    const description = await screen.findByText((text) => text.startsWith("Dive into the world of video games"));
    expect(description).toBeInTheDocument();

    const submittedDate = await screen.findByText((text) => text.includes("04/12/2025"));
    expect(submittedDate).toBeInTheDocument();

    const highscore = await screen.findByText("50");
    expect(highscore).toBeInTheDocument();

    const passPoint = await screen.findByText("60");
    expect(passPoint).toBeInTheDocument();
  });

  it("render start button", async () => {
    await act(async () => {
      render(<Quiz
        userPromise={Promise.resolve(userData)}
        quizPromise={Promise.resolve(quizData)}
        quizHistoryPromise={Promise.resolve(quizHistoryData)}
      />);
    });

    const startButton = screen.getByRole("button", { name: /start/i });
    expect(startButton).toBeInTheDocument();
  });

  it("show quiz panel on start pressed", async () => {
    await act(async () => {
      render(<Quiz
        userPromise={Promise.resolve(userData)}
        quizPromise={Promise.resolve(quizData)}
        quizHistoryPromise={Promise.resolve(quizHistoryData)}
      />);
    });

    const startButton = screen.getByRole("button", { name: /start/i });
    fireEvent.click(startButton);

    const quizPanel = screen.getByTestId("quiz-panel");
    expect(quizPanel).toBeInTheDocument();
  });
});