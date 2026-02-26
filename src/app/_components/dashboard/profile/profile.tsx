import { fetchCurrentUser } from "@/app/_lib/users";
import ProfileImage from "./profile-image";
import ProfileDetail from "./profile-info";
import { fetchUserQuizData } from "@/app/_lib/quizes";

export default async function Profile() {
  const user = await fetchCurrentUser();
  const quizResults = await fetchUserQuizData(user._id);

  return (
    <div className={`flex flex-col md:flex-row grow w-full items-center md:justify-start gap-8`}>
      <ProfileImage imageSource={user.image} />
      <ProfileDetail user={user} quizResult={quizResults} />
    </div>
  );
}