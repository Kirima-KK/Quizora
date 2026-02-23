import { Skeleton } from "@heroui/react"

export default function ProfileSkeleton() {
  return (
    <div className="skeleton--pulse flex flex-col md:flex-row grow w-full items-center md:justify-start gap-8">
      <Skeleton className="bg-gray-400 w-48 h-48 md:w-64 md:h-64 shrink-0 " />

      <div className="flex-1 space-y-2 w-full">
        <Skeleton className="bg-gray-400 h-8 w-full md:w-48 rounded-lg" />
        <div className="flex flex-col md:flex-row gap-2 md:gap-8">
          <Skeleton className="bg-gray-400 h-16 w-full md:w-48 rounded-lg" />
          <Skeleton className="bg-gray-400 h-16  md:w-48 rounded-lg" />
        </div>
      </div>
    </div>
  );
}