import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <>
      <Link href={"/dashboard"} className="flex items-center justify-center">
        <Image
          src="/quizora-blue.png"
          alt="quizola logo"
          width={435}
          height={89}
          className="w-48 md:w-32 h-auto"
        />
      </Link>
    </>
  );
}