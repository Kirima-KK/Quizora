import { QuizCollection, QuizHistoryItem, QuizInfo, UserResults } from "./definition";
import serverConfig from "../_config/server.config";
import { cookies } from "next/headers";

const getCookie = async (name: string) => {
  return (await cookies()).get(name)?.value ?? '';
}

export const fetchQuizes = async (page: number) => {
  try {
    const cookie = await getCookie('session');

    const res = await fetch(`${serverConfig.backendHost}/api/quiz?page=${page}`, {
      method: 'GET',
      headers: {
        Cookie: `session=${cookie}`
      }
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Request failed: ${text}`);
    }
    const data = await res.json();

    return data;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export const fetchQuizById = async (id: string) => {
  try {
    const cookie = await getCookie('session');

    const res = await fetch(`${serverConfig.backendHost}/api/quiz/${id}`, {
      method: 'GET',
      headers: {
        Cookie: `session=${cookie}`
      }
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Request failed: ${text}`);
    }

    const data = await res.json();

    return data;
  } catch (err) {
    console.error(err);
  }
}

export const fetchQuizByQuery = async (query: string) => {
  try {
    const cookie = await getCookie('session');

    const quizes = await fetch(`${serverConfig.backendHost}/api/quiz`, {
      method: 'GET',
      headers: {
        Cookie: `session=${cookie}`
      }
    });

    if (!quizes.ok) {
      const text = await quizes.text();
      throw new Error(`Request failed: ${text}`);
    }

    const result = await quizes.json();

    const filteredResult: QuizInfo[] = result.quizes.filter((quiz: QuizInfo) => quiz.name.toLowerCase().includes(query) || quiz.description.toLowerCase().includes(query));

    const ITEMS_PER_PAGE = Number(process.env.ITEMS_PER_PAGE);
    const totalPages = Math.ceil(filteredResult.length / ITEMS_PER_PAGE);
    const filteredQuiz: QuizCollection = { quizes: filteredResult, totalPages: totalPages };
    return filteredQuiz;
  } catch (err) {
    console.error(err);
    return { quizes: [], totalPages: 0 };
  }
}

export const fetchQuizHistoryByQuizId = async (userId: string, quizId: string) => {
  try {
    const cookie = await getCookie('session');

    const quizHistoryByUser = await fetch(`${serverConfig.backendHost}/api/quiz-history/${userId}`, {
      method: 'GET',
      headers: {
        Cookie: `session=${cookie}`
      }
    });

    if (!quizHistoryByUser.ok) {
      const text = await quizHistoryByUser.text();
      throw new Error(`Request failed: ${text}`);
    }

    const data = await quizHistoryByUser.json();
    const quizHistoryByQuizId = data.quizHistory.filter((quiz: QuizHistoryItem) => quiz.quizId === quizId);

    if (quizHistoryByUser.ok && quizHistoryByQuizId) {
      return quizHistoryByQuizId;
    }
  } catch (err) {
    console.error(err);
  }
}

export const fetchUserQuizHistory = async (userId: string, page: number) => {
  try {
    const cookie = await getCookie('session');

    const [quizHistoryRes, quizRes] = await Promise.all([
      fetch(`${serverConfig.backendHost}/api/quiz-history/${userId}`, {
        headers: {
          Cookie: `session=${cookie}`
        }
      }),
      fetch(`${serverConfig.backendHost}/api/quiz?page=${page}`, {
        credentials: 'include',
        headers: {
          Cookie: `session=${cookie}`
        }
      })
    ]);

    if (!quizHistoryRes.ok || !quizRes.ok) {
      const quizHistoryText = await quizHistoryRes.text();
      const quizText = await quizRes.text();
      throw new Error(`Request failed: QuizHistory: ${quizHistoryText} \n Quiz: ${quizText}`);
    }

    const [quizHistory, quizes] = await Promise.all([
      quizHistoryRes.json(),
      quizRes.json()
    ])

    const quizHistoryId = quizHistory.quizHistory.map((history: QuizHistoryItem) => history.quizId);
    const filteredQuiz = quizes.quizes.filter((quiz: QuizInfo) => quizHistoryId.includes(quiz._id));
    const ITEMS_PER_PAGE = Number(process.env.ITEMS_PER_PAGE);
    const totalPages = Math.ceil(filteredQuiz.length / ITEMS_PER_PAGE);
    const filteredQuizData: QuizCollection = { quizes: filteredQuiz, totalPages: totalPages };

    return filteredQuizData;
  } catch (err) {
    console.error(err);
    return { quizes: [], totalPages: 0 };
  }
}

export const fetchUserQuizData = async (userId: string) => {
  try {
    const cookie = await getCookie('session');

    const quizHistory = await fetch(`${serverConfig.backendHost}/api/quiz-history/${userId}`, {
      method: 'GET',
      headers: {
        Cookie: `session=${cookie}`
      }
    });

    if (!quizHistory.ok) {
      const text = await quizHistory.text();
      throw new Error(`Request failed: ${text}`);
    }

    const data = await quizHistory.json();
    let quizResult: UserResults = { quizPassed: 0, correctAnswers: 0 };

    data.quizHistory.forEach((history: QuizHistoryItem) => {
      if (history.quizStatus) quizResult.quizPassed += 1;
      if (history.score) quizResult.correctAnswers += history.score;
    });

    return quizResult;
  } catch (err) {
    console.error(err);
  }
}