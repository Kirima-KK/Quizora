import { Skeleton } from "@heroui/react"

export default function AvatarSkeleton() {
  return (
    <div className="skeleton--pulse flex flex-col md:flex-row grow w-full items-center md:justify-start gap-8">
      <Skeleton className="bg-gray-400 md:w-12 md:h-12 shrink-0 rounded-full" />

      <div className="flex-1 space-y-2">
        <Skeleton className="bg-gray-400 h-6 w-36 rounded-lg" />
      </div>
    </div>
  );
}