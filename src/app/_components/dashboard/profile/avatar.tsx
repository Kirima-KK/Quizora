'use client';

import Image from "next/image";
import { poppins } from "../../ui/font";
import { ProfileInfo } from "@/app/_lib/definition";
import { useEffect, useState } from "react";
import { fetchCurrentUser } from "@/app/_lib/users";
import AvatarSkeleton from "../../skeleton/avatar-skeleton";

export default function Avatar() {
  const [user, setUser] = useState<ProfileInfo>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUserData() {
      try {
        setLoading(true);

        // Fetch the user
        const userData = await fetchCurrentUser();
        setUser(userData);
      } catch (error) {
        console.error("Failed to load profile:", error);
      } finally {
        setLoading(false);
      }
    }

    loadUserData();
  }, [user?._id]);

  if (!user || loading) {
    return <AvatarSkeleton />;
  }

  return (
    <div className="flex flex-row gap-2 items-center ml-8 md:ml-48">
      <Image
        src={user.image}
        alt="avatar picture"
        width={48}
        height={48}
        className="w-8 h-8 md:w-12 md:h-12 object-cover rounded-full text-[var(--theme-blue)]"
      />

      <p className={`${poppins.className} hidden md:block text-[var(--theme-grey)]`}>{user.firstName} {user.lastName}</p>
    </div>
  );
}