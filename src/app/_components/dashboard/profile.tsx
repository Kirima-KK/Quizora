import Image from "next/image";
import FlagIcon from "@/app/_assets/icons/ant-design_flag-filled.svg";
import CorrectIcon from "@/app/_assets/icons/akar-icons_circle-check-fill.svg";
import { poppins } from "../ui/font";
import { fetchCurrentUser } from "@/app/_lib/users";
import { fetchUserQuizData } from "@/app/_lib/quizes";

export default async function Profile() {
  const user = await fetchCurrentUser();
  const quizResults = await fetchUserQuizData(user._id);

  const quizPassed = quizResults? quizResults.quizPassed : '-';
  const correctAnswers = quizResults ? quizResults.correctAnswers : '-';

  return (
    <div className={`flex flex-col md:flex-row grow w-full items-center md:justify-start gap-8`}>
      <Image
        src={user.image}
        alt="profile picture"
        width={245}
        height={235}
        className="w-42 h-42 md:w-64 md:h-64"
      />

      <div className={`${poppins.className} flex flex-col items-center md:items-start md:justify-start gap-8`}>
        <h1 className={`text-3xl font-bold text-[var(--theme-blue)]`}>{user.firstName} {user.lastName}</h1>

        <div className="flex gap-12">
          <div className="flex flex-col md:flex-row items-center text-center md:text-start gap-4 ">
            <span className={`w-12 h-12 shadow-lg rounded-lg flex items-center justify-center`}><FlagIcon className="w-6 h-6 md:w-8 md:h-8" /></span>
            <span className={`text-[var(--theme-grey)] flex flex-col gap-1`}>
              <h1 className={`text-xl font-bold`}>{quizPassed}</h1>
              <p className={`text-sm md:text-base`}>Quiz Passed</p>
            </span>
          </div>

          <div className="flex flex-col md:flex-row items-center text-center md:text-start gap-4">
            <span className={`w-12 h-12 shadow-lg rounded-lg flex items-center justify-center`}><CorrectIcon className="w-6 h-6 md:w-8 md:h-8" /></span>
            <span className={`text-[var(--theme-grey)] flex flex-col gap-1`}>
              <h1 className={`text-xl font-bold`}>{correctAnswers}</h1>
              <p className={`text-sm md:text-base`}>Correct Answers</p>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}