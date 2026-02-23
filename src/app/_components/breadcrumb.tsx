'use client';

import { usePathname } from "next/navigation";
import { poppins } from "./ui/font";

export function Breadcrumb({ quizName }: { quizName?: string }) {
  const pathname = usePathname();
  const allPath = pathname.split("/").filter(Boolean);

  const last = allPath[allPath.length - 1];
  const isQuizId = /^[a-f\d]{24}$/i.test(last);

  const isShow = (allPath: string[]): boolean => {
    if (allPath.includes("dashboard") && allPath.length === 1) return false;
    return true;
  }

  return (
    <div className={`${poppins.className} flex flex-row`}>
      {isShow(allPath) &&
        allPath
          .map((path, index) => {
            if (path.includes("-")) path = path.replace("-", " ");
            if (index === allPath.length - 1 && quizName && isQuizId) {
              path = quizName;
            }
            return <h1 key={path} className="capitalize text-xs md:text-xl text-[#C4C4C4]">{index === 0 ? "" : "/"} {path}&nbsp;</h1>
          })
      }
    </div>
  );
}