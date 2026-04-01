'use client';

import { fetchCurrentUser } from "@/app/_lib/users";
import ProfileImage from "./profile-image";
import ProfileDetail from "./profile-info";
import { fetchUserQuizData } from "@/app/_lib/quizes";
import { useEffect, useState } from "react";
import ProfileSkeleton from "../../skeleton/profile-skeleton";
import { ProfileInfo, UserResults } from "@/app/_lib/definition";

export default function Profile() {
  const [user, setUser] = useState<ProfileInfo>();
  const [quizResults, setQuizResults] = useState<UserResults>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfileData() {
      try {
        setLoading(true);

        // Fetch the user
        const userData = await fetchCurrentUser();
        setUser(userData);

        // Fetch the quiz data using the user's ID
        if (userData?._id) {
          const results = await fetchUserQuizData(userData._id);
          setQuizResults(results);
        }
      } catch (error) {
        console.error("Failed to load profile:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProfileData();
  }, []); // Empty dependency array means this runs once on mount

  if (loading) {
    return <ProfileSkeleton />;
  }

  if (!user) {
    return <div>Could not load user profile. Please log in again.</div>;
  }

  return (
    <div className={`flex flex-col md:flex-row grow w-full items-center md:justify-start gap-8`}>
      <ProfileImage imageSource={user.image} />
      <ProfileDetail user={user} quizResult={quizResults} />
    </div>
  );
}