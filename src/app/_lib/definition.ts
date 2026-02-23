export interface ProfileInfo {
  _id: string;
  firstName: string;
  lastName: string;
  image: string;
}

export interface UserResults {
  quizPassed: number;
  correctAnswers: number;
}

export interface LoginInfo {
  email: string,
  password: string
}

export interface UserQuizAnswer {
  id: number;
  choice: number;
  isCorrect: boolean;
}

export interface QuizHistoryItem {
  quizId: string;
  userId: string;
  answers: UserQuizAnswer[];
  submittedDate: string;
  score: number;
  quizStatus: boolean;
}

export interface Choice {
  id: number;
  choice: string;
}

export interface ChoiceStatus {
  isReview: boolean;
  isCorrect?: boolean;
  isUserAnswer?: boolean;
}

export interface Question {
  id: number;
  question: string;
  choices: Choice[];
  answer: number;
}

export interface QuizInfo {
  _id: string;
  name: string;
  description: string;
  image: string;
  passPoint: number;
  questions: Question[];
}

export interface QuizCollection {
  quizes: QuizInfo[];
  totalPages: number;
}

export interface QuizGameplayInfo {
  currentQuestionId: number;
  quizLength: number;
}

export interface QuizBreadcrumb {
  quizName: string;
  isQuizId: boolean;
}