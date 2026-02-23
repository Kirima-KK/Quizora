import { Metadata } from "next";
import { nunito_sans, poppins } from "./_components/ui/font";
import Link from "next/link";
import WhiteLogo from '@/app/_assets/icons/quizora-white.svg';

export const metadata: Metadata = {
  title: "Quizora",
}

export default function Home() {
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

      <Link href="/login" className="z-10">
        <button className="text-[var(--theme-blue)] border border-[var(--theme-blue)] w-full md:w-90 md:h-26 text-base font-semibold md:text-3xl bg-white hover:bg-[var(--theme-blue)] hover:text-white font-lg rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Login</button>
      </Link>
    </div>
  );
}
