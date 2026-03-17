import { Metadata } from "next";
import Landing from "./_components/home/landing";

export const metadata: Metadata = {
  title: "Quizora",
}

export default function Home() {
  return (
    <Landing />
  );
}
