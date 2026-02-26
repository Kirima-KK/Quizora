'use client'

import Link from "next/link";
import Dashboard from "@/app/_assets/icons/ic_round-space-dashboard.svg";
import History from "@/app/_assets/icons/ic_twotone-history.svg";
import clsx from 'clsx';
import { usePathname } from "next/navigation";
import { poppins } from "../../ui/font";

const links = [
  { name: 'Dashboard', href: '/dashboard', icon: Dashboard },
  { name: 'Quiz History', href: '/dashboard/quiz-history', icon: History }
]

export default function NavLinks() {
  const pathname = usePathname();
  
  return (
    <div>
      {
        links.map((link) => {
          const LinkIcon = link.icon;
          return (
            <div key={link.name}>
              <Link
                href={link.href}
                className={clsx(`${poppins.className} font-bold flex w-[48px] h-[48px] md:w-full grow items-center justify-center gap-2 rounded-md p-1 md:p-3 text-sm text-[var(--theme-grey)] font-medium md:flex-none md:justify-start`,
                  {
                    'bg-[var(--theme-blue)] text-white': pathname === link.href,
                    'bg-grey-500 text-[var(--theme-grey)] hover:bg-sky-100 hover:text-blue-600': pathname !== link.href,
                  }
                )}
              >
                <LinkIcon className={clsx("w-8 h-8 md:h-6 text-[var(--theme-blue)]",
                  {
                    'text-white': pathname === link.href,
                  }
                )} />
                <p className="hidden md:block font-semibold">{link.name}</p>
              </Link>
              <br />
            </div>
          );
        })
      }
    </div>
  );
}