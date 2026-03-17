import { Skeleton } from "@heroui/react";

export function QuizesSkeleton() {
  return (
    <div className="skeleton--pulse grow w-64 md:w-380 grid grid-cols-1 md:grid-cols-3 gap-8">
      <Skeleton className="bg-gray-400 w-full h-64 md:h-80 rounded-xl" />
      <Skeleton className="bg-gray-400 w-full h-64 md:h-80 rounded-xl" />
      <Skeleton className="bg-gray-400 w-full h-64 md:h-80 rounded-xl" />
    </div>
  );
}