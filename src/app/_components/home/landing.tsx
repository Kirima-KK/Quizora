'use client'

import { nunito_sans, poppins } from "@/app/_components/ui/font";
import WhiteLogo from '@/app/_assets/icons/quizora-white.svg';
import { WhiteButton } from "../ui/buttons";
import { useRouter } from 'next/navigation';
import { ButtonInfo } from "@/app/_lib/definition";

export default function Landing() {
  const router = useRouter();
  const handleClick = () => { router.push("/login") }

  const buttonInfo: ButtonInfo = {
    size: "w-full md:w-1/6 h-20",
    label: "Login",
    type: "button",
    isDisabled: false,
    isLoading: false,
    onClick: handleClick,
  }

  return (
    <div className={`${poppins.className} overflow-hidden flex flex-col gap-8 items-center justify-center relative h-screen w-full`}>
      <div className="absolute inset-0 bg-cover bg-center bg-[url('/landing-bg.png')] blur-sm scale-105"></div>
      <div className="absolute inset-0 bg-[var(--theme-blue)]/50 scale-y-110 md:scale-100"></div>

      <WhiteLogo
        alt={"Quizora Logo"}
        width={435}
        height={89}
        className="w-32 md:w-120 h-auto z-10"
      />

      <h1 className={`${nunito_sans} text-base text-white font-semibold text-center z-10 md:text-3xl md:leading-normal`}>Log in and ignite your quiz journey! <br /><br />Track your progress, beat your best scores, <br />and push your skills to the next level. <br /><br />Start your adventure now!</h1>

      <WhiteButton info={buttonInfo} />
    </div>
  );
}