import { useState } from "react";
import { handleLogin, logoutHandler } from "../_lib/auth-action";
import { LoginInfo, QuizHistoryItem } from "../_lib/definition";
import { usePathname, useRouter } from "next/navigation";
import { postQuizResult } from "../_lib/action";

export const useLoginSubmit = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState({ type: "", message: "" });
  const [error, setError] = useState();
  const router = useRouter();

  const submit = async (data: LoginInfo) => {
    setIsLoading(true);

    try {
      const res = await handleLogin(data);
      if (res.error) {
        setError(res.error);
        setIsLoading(false);
        return;
      }

      setResponse({
        type: 'success',
        message: `Thanks for your submission ${res.email}, we will get back to you shortly!.`
      });

      router.push('/dashboard');
    } catch (e) {
      setResponse({
        type: 'error',
        message: 'Email or password is incorrect.'
      });

      setIsLoading(false);
    }
  }

  return { isLoading, response, submit };
};

export const useLogout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState({ type: "", message: "" });
  const [error, setError] = useState();
  const router = useRouter();

  const logout = async () => {
    setIsLoading(true);

    try {
      const res = await logoutHandler();
      if (res.error) {
        setError(res.error);
        setIsLoading(false);
        return;
      }

      setResponse({
        type: 'success',
        message: `Thanks for your submission ${res.email}, we will get back to you shortly!.`
      });

      router.push('/');
    } catch (e) {
      setResponse({
        type: 'error',
        message: 'Email or password is incorrect.'
      });

      setIsLoading(false);
    }
  }

  return { isLoading, response, logout };
};

export const useQuizSubmit = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState({ type: "", message: "" });
  const [error, setError] = useState();

  const router = useRouter();
  const pathname = usePathname();

  const submit = async (data: QuizHistoryItem) => {
    setIsLoading(true);

    try {
      const res = await postQuizResult(data);
      if (res.error) setError(res.error);

      if (!res.error) {
        setResponse({
          type: 'success',
          message: `Thanks for your submission.`
        });
      }
    } catch (e) {
      setResponse({
        type: 'error',
        message: 'Something went wrong.'
      });
      router.push(pathname);
    } finally {
      setIsLoading(false);
    }
  }

  return { isLoading, response, submit };
};