import { Skeleton } from "@heroui/react"

export default function QuizInfoSkeleton() {
  return (
    <div className="skeleton--pulse w-64 md:w-400 flex md:flex-row md:gap-24">
      <div className="flex flex-col gap-8 w-full">
        <Skeleton className="bg-gray-400 h-6 w-full md:w-2/5 rounded-lg" />
        <Skeleton className="md:ml-40 bg-gray-400 w-full h-64 md:h-120 rounded-lg" />
        <div className="md:ml-40 space-y-3 w-full">
          <Skeleton className="bg-gray-400 h-3 w-3/5 rounded-lg" />
          <Skeleton className="bg-gray-400 h-3 w-4/5 rounded-lg" />
          <Skeleton className="bg-gray-400 h-3 w-2/5 rounded-lg" />
        </div>
      </div>

      <div className="flex flex-col text-left invisible md:visible md:w-full md:items-center md:justify-center">
        <div className="md:ml-40 space-y-8 w-3/5">
          <Skeleton className="bg-gray-400 h-6 w-4/5 rounded-lg" />
          <Skeleton className="bg-gray-400 h-6 w-3/5 rounded-lg" />
          <Skeleton className="bg-gray-400 h-6 w-2/5 rounded-lg" />
        </div>
      </div>
    </div>
  );
}