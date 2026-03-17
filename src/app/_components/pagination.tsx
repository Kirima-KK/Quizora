'use client';

import { usePathname, useSearchParams } from "next/navigation";
import { poppins } from "./ui/font";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";

const ArrowDirection = {
  Left: "left",
  Right: "right"
}
type ArrowDirection = typeof ArrowDirection[keyof typeof ArrowDirection];

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  }

  return (
    <div className={`${poppins.className} flex flex-row gap-8 items-center justify-center md:justify-end`}>
      <PaginationArrow
        href={createPageURL(currentPage - 1)}
        direction={ArrowDirection.Left}
        isDisabled={currentPage <= 1}
      />
      <PaginationNumber currentPage={currentPage} />
      <PaginationArrow
        href={createPageURL(currentPage + 1)}
        direction={ArrowDirection.Right}
        isDisabled={currentPage >= totalPages}
      />
    </div>
  );
}

function PaginationNumber({ currentPage }: { currentPage: number | string }) {
  return (
    <div>
      <h1 className="text-xl">Page {currentPage}</h1>
    </div>
  );
}

function PaginationArrow({
  href,
  direction,
  isDisabled
}: {
  href: string,
  direction: ArrowDirection,
  isDisabled: boolean
}) {
  const variant = clsx(
    'w-8 h-8 text-[var(--theme-blue)]', {
    'text-[var(--theme-grey)]': isDisabled
  }
  );

  const icon = direction == ArrowDirection.Left ?
    < ChevronLeftIcon
      className={variant}
    />
    :
    <ChevronRightIcon
      className={variant}
    />;

  return (
    <div>
      {
        isDisabled ?
          <div>{icon}</div> : (
            <Link href={href}>
              {icon}
            </Link>
          )
      }
    </div>
  );
}