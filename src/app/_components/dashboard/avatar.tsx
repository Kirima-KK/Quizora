import Image from "next/image";
import { poppins } from "../ui/font";
import { ProfileInfo } from "@/app/_lib/definition";

export default function Avatar({ user }: { user: ProfileInfo }) {
  return (
    <div >
      {user == null ? <h1>Loading...</h1> : (
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
      )}
    </div>
  );
}